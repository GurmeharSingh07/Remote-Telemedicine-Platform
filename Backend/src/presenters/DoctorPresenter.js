const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Prescription = require('../models/Prescription');
const Referral = require('../models/Referral');
const TestResult = require('../models/TestResult');
const User = require('../models/User');

const WORKING_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DEFAULT_SCHEDULE = {
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    startTime: '09:00',
    endTime: '17:00',
    slotDurationMinutes: 30
};

class DoctorPresenter {
    constructor() {
        this.hasEnsuredDoctorIndexes = false;
    }

    async ensureDoctorIndexes() {
        if (this.hasEnsuredDoctorIndexes) {
            return;
        }

        try {
            const indexes = await Doctor.collection.indexes();
            const legacyEmailIndex = indexes.find(
                (index) => index?.key?.email === 1 && index.unique === true && !index.partialFilterExpression
            );

            if (legacyEmailIndex?.name) {
                await Doctor.collection.dropIndex(legacyEmailIndex.name);
            }

            await Doctor.syncIndexes();
            this.hasEnsuredDoctorIndexes = true;
        } catch (error) {
            // no-op; we continue with runtime behavior even if index migration fails.
        }
    }

    normalizeName(value) {
        if (!value) {
            return '';
        }

        return value.trim().replace(/\s+/g, ' ');
    }

    normalizeEmail(value) {
        if (!value) {
            return undefined;
        }

        return String(value).trim().toLowerCase();
    }

    toId(value) {
        if (!value) {
            return '';
        }

        if (typeof value === 'string') {
            return value;
        }

        if (value._id) {
            return value._id.toString();
        }

        return value.toString();
    }

    getInitials(name) {
        if (!name) {
            return 'DR';
        }

        const parts = name.trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) {
            return 'DR';
        }

        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }

        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    formatDatabaseError(error) {
        if (error?.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern || {})[0] || 'field';
            return `Duplicate value for ${duplicateField}. Please use a unique ${duplicateField}.`;
        }

        return error?.message || 'Unexpected server error';
    }

    getDoctorAliases(user, doctor) {
        const aliases = [
            this.normalizeName(user?.name),
            this.normalizeName(doctor?.name)
        ].filter(Boolean);

        return [...new Set(aliases)];
    }

    parseTimeToMinutes(value) {
        if (!value || typeof value !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
            return null;
        }

        const [hour, minute] = value.split(':').map((part) => Number(part));
        return (hour * 60) + minute;
    }

    sanitizeWorkingDays(days) {
        if (!Array.isArray(days)) {
            return [...DEFAULT_SCHEDULE.workingDays];
        }

        const cleaned = days
            .map((value) => (typeof value === 'string' ? value.trim() : ''))
            .filter((value) => WORKING_DAYS.includes(value));

        return [...new Set(cleaned)];
    }

    serializeSchedule(schedule) {
        const sanitizedDays = this.sanitizeWorkingDays(schedule?.workingDays);

        return {
            workingDays: sanitizedDays.length > 0 ? sanitizedDays : [...DEFAULT_SCHEDULE.workingDays],
            startTime: schedule?.startTime || DEFAULT_SCHEDULE.startTime,
            endTime: schedule?.endTime || DEFAULT_SCHEDULE.endTime,
            slotDurationMinutes: Number(schedule?.slotDurationMinutes) || DEFAULT_SCHEDULE.slotDurationMinutes,
            updatedAt: schedule?.updatedAt || null
        };
    }

    serializeDoctor(doctor) {
        return {
            id: doctor._id.toString(),
            name: doctor.name,
            specialty: doctor.specialty,
            hospital: doctor.hospital,
            location: doctor.location,
            rating: doctor.rating,
            experience: doctor.experience || '',
            distance: doctor.distance || '',
            available: Boolean(doctor.available),
            image: doctor.image || this.getInitials(doctor.name),
            phone: doctor.phone || '',
            schedule: this.serializeSchedule(doctor.schedule)
        };
    }

    serializeAppointment(appointment) {
        return {
            id: appointment._id.toString(),
            patientId: this.toId(appointment.patient),
            patientName: appointment.patientName,
            doctorId: this.toId(appointment.doctor),
            doctorName: appointment.doctorName,
            specialty: appointment.specialty,
            hospital: appointment.hospital,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            reason: appointment.reason || '',
            createdAt: appointment.createdAt
        };
    }

    serializeReferral(referral) {
        return {
            id: referral._id.toString(),
            fromDoctor: referral.fromDoctor,
            toDoctor: referral.toDoctor,
            patientName: referral.patientName,
            reason: referral.reason,
            status: referral.status,
            date: referral.date,
            createdAt: referral.createdAt
        };
    }

    serializePatient(item) {
        return {
            id: item.id,
            name: item.name,
            email: item.email || '',
            condition: item.condition,
            lastVisit: item.lastVisit,
            hospital: item.hospital,
            avatar: item.avatar,
            appointmentCount: item.appointmentCount
        };
    }

    serializeTestResult(testResult, patient) {
        return {
            id: testResult._id.toString(),
            patientId: this.toId(testResult.patient),
            patientName: patient?.name || 'Unknown Patient',
            test: testResult.test,
            date: testResult.date,
            status: testResult.status,
            hospital: testResult.hospital,
            icon: testResult.icon || '🔬'
        };
    }

    serializePrescription(prescription, patient) {
        return {
            id: prescription._id.toString(),
            patientId: this.toId(prescription.patient),
            patientName: patient?.name || 'Unknown Patient',
            doctor: prescription.doctor,
            date: prescription.date,
            medicines: prescription.medicines || [],
            validUntil: prescription.validUntil
        };
    }

    buildPatientRecords(appointments, patientsById) {
        const recordsMap = new Map();

        appointments.forEach((appointment) => {
            const patientId = this.toId(appointment.patient) || appointment.patientName;
            const patient = patientsById.get(patientId);
            const existing = recordsMap.get(patientId);

            if (!existing) {
                recordsMap.set(patientId, {
                    id: patientId,
                    name: patient?.name || appointment.patientName,
                    email: patient?.email || '',
                    condition: appointment.reason || appointment.specialty,
                    lastVisit: appointment.date,
                    hospital: appointment.hospital,
                    avatar: this.getInitials(patient?.name || appointment.patientName),
                    appointmentCount: 1,
                    lastVisitTimestamp: appointment.createdAt ? new Date(appointment.createdAt).getTime() : 0
                });
                return;
            }

            existing.appointmentCount += 1;

            const currentTimestamp = appointment.createdAt ? new Date(appointment.createdAt).getTime() : 0;
            if (currentTimestamp >= existing.lastVisitTimestamp) {
                existing.condition = appointment.reason || appointment.specialty;
                existing.lastVisit = appointment.date;
                existing.hospital = appointment.hospital;
                existing.lastVisitTimestamp = currentTimestamp;
            }
        });

        return Array.from(recordsMap.values())
            .sort((a, b) => b.lastVisitTimestamp - a.lastVisitTimestamp)
            .map(({ lastVisitTimestamp, ...record }) => this.serializePatient(record));
    }

    buildChats(appointments, patientsById) {
        const chatsMap = new Map();

        appointments
            .slice()
            .sort((a, b) => {
                const aTimestamp = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const bTimestamp = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return bTimestamp - aTimestamp;
            })
            .forEach((appointment) => {
                const patientId = this.toId(appointment.patient) || appointment.patientName;
                if (chatsMap.has(patientId)) {
                    return;
                }

                const patient = patientsById.get(patientId);
                const reasonText = appointment.reason ? `Reason: ${appointment.reason}` : `Appointment ${appointment.status}`;

                chatsMap.set(patientId, {
                    id: `chat-${patientId}`,
                    patientId,
                    patientName: patient?.name || appointment.patientName,
                    lastMessage: reasonText,
                    lastInteraction: `${appointment.date} ${appointment.time}`,
                    unreadCount: 0
                });
            });

        return Array.from(chatsMap.values());
    }

    async resolveCurrentDoctor(userId) {
        const user = await User.findById(userId);
        if (!user) {
            return { error: { success: false, status: 404, message: 'User not found' } };
        }

        await this.ensureDoctorIndexes();

        const normalizedName = this.normalizeName(user.name);
        const normalizedEmail = this.normalizeEmail(user.email);

        let doctor = await Doctor.findOne({ user: user._id });

        if (!doctor && normalizedEmail) {
            doctor = await Doctor.findOne({ email: normalizedEmail });
        }

        if (!doctor && normalizedName) {
            doctor = await Doctor.findOne({ name: normalizedName });
        }

        if (!doctor) {
            try {
                doctor = await Doctor.create({
                    user: user._id,
                    email: normalizedEmail,
                    name: normalizedName || user.name,
                    specialty: 'General Physician',
                    hospital: 'HealNet Hospital',
                    location: 'India',
                    available: true,
                    image: this.getInitials(normalizedName || user.name),
                    phone: '',
                    schedule: { ...DEFAULT_SCHEDULE }
                });
            } catch (error) {
                if (error?.code === 11000) {
                    doctor = await Doctor.findOne({
                        $or: [
                            { user: user._id },
                            normalizedEmail ? { email: normalizedEmail } : null,
                            normalizedName ? { name: normalizedName } : null
                        ].filter(Boolean)
                    });
                }

                if (!doctor) {
                    throw error;
                }
            }
        }

        let shouldSave = false;

        if (!doctor.user) {
            doctor.user = user._id;
            shouldSave = true;
        }

        if (!doctor.email && normalizedEmail) {
            doctor.email = normalizedEmail;
            shouldSave = true;
        }

        if (normalizedName && doctor.name !== normalizedName && this.toId(doctor.user) === this.toId(user._id)) {
            doctor.name = normalizedName;
            shouldSave = true;
        }

        if (!doctor.schedule) {
            doctor.schedule = { ...DEFAULT_SCHEDULE };
            shouldSave = true;
        }

        if (shouldSave) {
            await doctor.save();
        }

        return { user, doctor };
    }

    async getDashboard(userId) {
        try {
            const context = await this.resolveCurrentDoctor(userId);
            if (context.error) {
                return context.error;
            }

            const { user, doctor } = context;
            const doctorAliases = this.getDoctorAliases(user, doctor);

            const [appointments, referrals, doctors, prescriptions] = await Promise.all([
                Appointment.find({ doctor: doctor._id }).sort({ date: 1, time: 1, createdAt: -1 }),
                Referral.find({ toDoctor: { $in: doctorAliases } }).sort({ createdAt: -1 }),
                Doctor.find({ _id: { $ne: doctor._id } }).sort({ rating: -1, name: 1 }),
                Prescription.find({
                    $or: [
                        { doctorId: doctor._id },
                        { doctor: { $in: doctorAliases } }
                    ]
                }).sort({ date: -1, createdAt: -1 })
            ]);

            const patientIds = [...new Set(appointments.map((appointment) => this.toId(appointment.patient)).filter(Boolean))];

            const [patients, testResults] = await Promise.all([
                patientIds.length > 0
                    ? User.find({ _id: { $in: patientIds } }).select('name email')
                    : [],
                patientIds.length > 0
                    ? TestResult.find({ patient: { $in: patientIds } }).sort({ date: -1, createdAt: -1 })
                    : []
            ]);

            const patientsById = new Map(
                patients.map((item) => [
                    item._id.toString(),
                    {
                        id: item._id.toString(),
                        name: item.name,
                        email: item.email
                    }
                ])
            );

            return {
                success: true,
                status: 200,
                data: {
                    doctor: this.serializeDoctor(doctor),
                    appointments: appointments.map((item) => this.serializeAppointment(item)),
                    patients: this.buildPatientRecords(appointments, patientsById),
                    referrals: referrals.map((item) => this.serializeReferral(item)),
                    tests: testResults.map((item) => this.serializeTestResult(item, patientsById.get(this.toId(item.patient)))),
                    prescriptions: prescriptions.map((item) => this.serializePrescription(item, patientsById.get(this.toId(item.patient)))),
                    chats: this.buildChats(appointments, patientsById),
                    doctors: doctors.map((item) => this.serializeDoctor(item)),
                    schedule: this.serializeSchedule(doctor.schedule)
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: this.formatDatabaseError(error)
            };
        }
    }

    async updateAppointmentStatus(userId, appointmentId, status) {
        try {
            const context = await this.resolveCurrentDoctor(userId);
            if (context.error) {
                return context.error;
            }

            const { doctor } = context;

            const appointment = await Appointment.findOne({ _id: appointmentId, doctor: doctor._id });
            if (!appointment) {
                return {
                    success: false,
                    status: 404,
                    message: 'Appointment not found'
                };
            }

            appointment.status = status;
            await appointment.save();

            return {
                success: true,
                status: 200,
                message: `Appointment ${status} successfully`,
                data: {
                    appointment: this.serializeAppointment(appointment)
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: this.formatDatabaseError(error)
            };
        }
    }

    async createReferral(userId, input) {
        try {
            const context = await this.resolveCurrentDoctor(userId);
            if (context.error) {
                return context.error;
            }

            const { doctor } = context;

            const referral = await Referral.create({
                fromDoctor: doctor.name,
                toDoctor: input.toDoctor,
                patientName: input.patientName,
                reason: input.reason,
                status: 'pending',
                date: new Date().toISOString().split('T')[0]
            });

            return {
                success: true,
                status: 201,
                message: 'Referral sent successfully',
                data: {
                    referral: this.serializeReferral(referral)
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: this.formatDatabaseError(error)
            };
        }
    }

    async updateReferralStatus(userId, referralId, status) {
        try {
            const context = await this.resolveCurrentDoctor(userId);
            if (context.error) {
                return context.error;
            }

            const { user, doctor } = context;
            const doctorAliases = this.getDoctorAliases(user, doctor);

            const referral = await Referral.findOne({ _id: referralId, toDoctor: { $in: doctorAliases } });
            if (!referral) {
                return {
                    success: false,
                    status: 404,
                    message: 'Referral not found'
                };
            }

            referral.status = status;
            await referral.save();

            return {
                success: true,
                status: 200,
                message: `Referral ${status} successfully`,
                data: {
                    referral: this.serializeReferral(referral)
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: this.formatDatabaseError(error)
            };
        }
    }

    async updateSchedule(userId, input) {
        try {
            const context = await this.resolveCurrentDoctor(userId);
            if (context.error) {
                return context.error;
            }

            const { doctor } = context;

            const workingDays = this.sanitizeWorkingDays(input.workingDays);
            if (workingDays.length === 0) {
                return {
                    success: false,
                    status: 400,
                    message: 'At least one valid working day is required'
                };
            }

            const startMinutes = this.parseTimeToMinutes(input.startTime);
            const endMinutes = this.parseTimeToMinutes(input.endTime);

            if (startMinutes === null || endMinutes === null) {
                return {
                    success: false,
                    status: 400,
                    message: 'Invalid schedule time. Use HH:mm format.'
                };
            }

            if (startMinutes >= endMinutes) {
                return {
                    success: false,
                    status: 400,
                    message: 'Schedule start time must be earlier than end time'
                };
            }

            doctor.schedule = {
                workingDays,
                startTime: input.startTime,
                endTime: input.endTime,
                slotDurationMinutes: Number(input.slotDurationMinutes) || DEFAULT_SCHEDULE.slotDurationMinutes,
                updatedAt: new Date()
            };

            await doctor.save();

            return {
                success: true,
                status: 200,
                message: 'Schedule updated successfully',
                data: {
                    schedule: this.serializeSchedule(doctor.schedule)
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: this.formatDatabaseError(error)
            };
        }
    }
}

module.exports = new DoctorPresenter();

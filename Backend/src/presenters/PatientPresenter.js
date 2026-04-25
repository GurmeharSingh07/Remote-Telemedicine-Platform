const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const MedicalRecord = require('../models/MedicalRecord');
const Prescription = require('../models/Prescription');
const TestResult = require('../models/TestResult');
const User = require('../models/User');

const DEFAULT_DOCTORS = [
    {
        name: 'Dr. Priya Menon',
        specialty: 'Cardiologist',
        hospital: 'Apollo Chennai',
        location: 'Chennai, Tamil Nadu',
        rating: 4.9,
        experience: '15 years',
        distance: '2.3 km',
        available: true,
        image: 'PM',
        phone: '+91 98765 10001'
    },
    {
        name: 'Dr. Rahul Sharma',
        specialty: 'Neurologist',
        hospital: 'Fortis Mumbai',
        location: 'Mumbai, Maharashtra',
        rating: 4.8,
        experience: '12 years',
        distance: '4.1 km',
        available: true,
        image: 'RS',
        phone: '+91 98765 10002'
    },
    {
        name: 'Dr. Sunita Devi',
        specialty: 'Dermatologist',
        hospital: 'Max Delhi',
        location: 'Delhi NCR',
        rating: 4.7,
        experience: '10 years',
        distance: '5.8 km',
        available: false,
        image: 'SD',
        phone: '+91 98765 10003'
    },
    {
        name: 'Dr. Arjun Patel',
        specialty: 'Orthopedic',
        hospital: 'Medanta Gurgaon',
        location: 'Gurgaon, Haryana',
        rating: 4.9,
        experience: '18 years',
        distance: '7.2 km',
        available: true,
        image: 'AP',
        phone: '+91 98765 10004'
    },
    {
        name: 'Dr. Kavita Singh',
        specialty: 'Pediatrician',
        hospital: 'Manipal Bangalore',
        location: 'Bangalore, Karnataka',
        rating: 4.8,
        experience: '14 years',
        distance: '3.5 km',
        available: true,
        image: 'KS',
        phone: '+91 98765 10005'
    },
    {
        name: 'Dr. Rajesh Gupta',
        specialty: 'Pulmonologist',
        hospital: 'Max Delhi',
        location: 'Delhi NCR',
        rating: 4.7,
        experience: '13 years',
        distance: '4.5 km',
        available: true,
        image: 'RG',
        phone: '+91 98765 10006'
    }
];

class PatientPresenter {
    async ensureDoctorSeedData() {
        try {
            const count = await Doctor.estimatedDocumentCount();
            if (count === 0) {
                await Doctor.insertMany(DEFAULT_DOCTORS);
            }
        } catch (error) {
            // No-op: dashboard still works even if seed step fails.
        }
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
            phone: doctor.phone || ''
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

    serializeMedicalRecord(record) {
        return {
            id: record._id.toString(),
            title: record.title,
            date: record.date,
            hospital: record.hospital,
            type: record.type,
            icon: record.icon || '📋'
        };
    }

    serializeTestResult(testResult) {
        return {
            id: testResult._id.toString(),
            test: testResult.test,
            date: testResult.date,
            status: testResult.status,
            hospital: testResult.hospital,
            icon: testResult.icon || '🔬'
        };
    }

    serializePrescription(prescription) {
        return {
            id: prescription._id.toString(),
            doctor: prescription.doctor,
            date: prescription.date,
            medicines: prescription.medicines || [],
            validUntil: prescription.validUntil
        };
    }

    async getDashboard(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return {
                    success: false,
                    status: 404,
                    message: 'User not found'
                };
            }

            const [appointments, medicalRecords, testResults, prescriptions] = await Promise.all([
                Appointment.find({ patient: userId }).sort({ date: -1, createdAt: -1 }),
                MedicalRecord.find({ patient: userId }).sort({ date: -1, createdAt: -1 }),
                TestResult.find({ patient: userId }).sort({ date: -1, createdAt: -1 }),
                Prescription.find({ patient: userId }).sort({ date: -1, createdAt: -1 })
            ]);

            return {
                success: true,
                status: 200,
                data: {
                    patient: {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    },
                    appointments: appointments.map((item) => this.serializeAppointment(item)),
                    medicalRecords: medicalRecords.map((item) => this.serializeMedicalRecord(item)),
                    testResults: testResults.map((item) => this.serializeTestResult(item)),
                    prescriptions: prescriptions.map((item) => this.serializePrescription(item))
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message
            };
        }
    }

    async getDoctors(filters = {}) {
        try {
            await this.ensureDoctorSeedData();

            const query = {};

            if (filters.specialty && filters.specialty.toLowerCase() !== 'all') {
                query.specialty = { $regex: filters.specialty, $options: 'i' };
            }

            const doctors = await Doctor.find(query).sort({ rating: -1, name: 1 });

            return {
                success: true,
                status: 200,
                data: {
                    doctors: doctors.map((item) => this.serializeDoctor(item)),
                    total: doctors.length
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message
            };
        }
    }

    async bookAppointment(userId, input) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return {
                    success: false,
                    status: 404,
                    message: 'User not found'
                };
            }

            const doctor = await Doctor.findById(input.doctorId);
            if (!doctor) {
                return {
                    success: false,
                    status: 404,
                    message: 'Doctor not found'
                };
            }

            const slotAlreadyBooked = await Appointment.findOne({
                doctor: doctor._id,
                date: input.date,
                time: input.time,
                status: { $ne: 'cancelled' }
            });

            if (slotAlreadyBooked) {
                return {
                    success: false,
                    status: 400,
                    message: 'This time slot is already booked. Please select a different time.'
                };
            }

            const appointment = await Appointment.create({
                patient: user._id,
                patientName: user.name,
                doctor: doctor._id,
                doctorName: doctor.name,
                specialty: doctor.specialty,
                hospital: doctor.hospital,
                date: input.date,
                time: input.time,
                reason: input.reason || '',
                status: 'pending'
            });

            return {
                success: true,
                status: 201,
                message: 'Appointment booked successfully',
                data: {
                    appointment: this.serializeAppointment(appointment)
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message
            };
        }
    }

    async cancelAppointment(userId, appointmentId) {
        try {
            const appointment = await Appointment.findOne({ _id: appointmentId, patient: userId });

            if (!appointment) {
                return {
                    success: false,
                    status: 404,
                    message: 'Appointment not found'
                };
            }

            if (appointment.status === 'completed') {
                return {
                    success: false,
                    status: 400,
                    message: 'Completed appointments cannot be cancelled'
                };
            }

            appointment.status = 'cancelled';
            await appointment.save();

            return {
                success: true,
                status: 200,
                message: 'Appointment cancelled successfully',
                data: {
                    appointment: this.serializeAppointment(appointment)
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message
            };
        }
    }
}

module.exports = new PatientPresenter();
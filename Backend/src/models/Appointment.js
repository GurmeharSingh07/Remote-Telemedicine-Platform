const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Patient is required']
        },
        patientName: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: [true, 'Doctor is required']
        },
        doctorName: {
            type: String,
            required: [true, 'Doctor name is required'],
            trim: true
        },
        specialty: {
            type: String,
            required: [true, 'Specialty is required'],
            trim: true
        },
        hospital: {
            type: String,
            required: [true, 'Hospital is required'],
            trim: true
        },
        date: {
            type: String,
            required: [true, 'Appointment date is required']
        },
        time: {
            type: String,
            required: [true, 'Appointment time is required']
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending'
        },
        reason: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

appointmentSchema.index({ patient: 1, date: -1, createdAt: -1 });
appointmentSchema.index({ doctor: 1, date: 1, time: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
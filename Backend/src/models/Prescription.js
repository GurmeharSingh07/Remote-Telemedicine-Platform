const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Patient is required']
        },
        doctor: {
            type: String,
            required: [true, 'Doctor name is required'],
            trim: true
        },
        date: {
            type: String,
            required: [true, 'Prescription date is required']
        },
        medicines: {
            type: [String],
            default: []
        },
        validUntil: {
            type: String,
            required: [true, 'Prescription validity date is required']
        }
    },
    {
        timestamps: true
    }
);

prescriptionSchema.index({ patient: 1, date: -1, createdAt: -1 });

module.exports = mongoose.model('Prescription', prescriptionSchema);
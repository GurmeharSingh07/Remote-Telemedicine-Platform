const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Patient is required']
        },
        title: {
            type: String,
            required: [true, 'Record title is required'],
            trim: true
        },
        date: {
            type: String,
            required: [true, 'Record date is required']
        },
        hospital: {
            type: String,
            required: [true, 'Hospital is required'],
            trim: true
        },
        type: {
            type: String,
            required: [true, 'Record type is required'],
            trim: true
        },
        icon: {
            type: String,
            default: '📋'
        }
    },
    {
        timestamps: true
    }
);

medicalRecordSchema.index({ patient: 1, date: -1, createdAt: -1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
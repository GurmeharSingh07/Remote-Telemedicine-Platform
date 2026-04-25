const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Patient is required']
        },
        test: {
            type: String,
            required: [true, 'Test name is required'],
            trim: true
        },
        date: {
            type: String,
            required: [true, 'Test date is required']
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            trim: true,
            default: 'Pending'
        },
        hospital: {
            type: String,
            required: [true, 'Hospital is required'],
            trim: true
        },
        icon: {
            type: String,
            default: '🔬'
        }
    },
    {
        timestamps: true
    }
);

testResultSchema.index({ patient: 1, date: -1, createdAt: -1 });

module.exports = mongoose.model('TestResult', testResultSchema);
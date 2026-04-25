const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
    {
        fromDoctor: {
            type: String,
            required: [true, 'Referring doctor name is required'],
            trim: true
        },
        toDoctor: {
            type: String,
            required: [true, 'Receiving doctor name is required'],
            trim: true
        },
        patientName: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true
        },
        reason: {
            type: String,
            required: [true, 'Referral reason is required'],
            trim: true,
            maxlength: [1000, 'Referral reason cannot exceed 1000 characters']
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        },
        date: {
            type: String,
            default: () => new Date().toISOString().split('T')[0]
        }
    },
    {
        timestamps: true
    }
);

referralSchema.index({ toDoctor: 1, status: 1, createdAt: -1 });
referralSchema.index({ fromDoctor: 1, createdAt: -1 });

module.exports = mongoose.model('Referral', referralSchema);
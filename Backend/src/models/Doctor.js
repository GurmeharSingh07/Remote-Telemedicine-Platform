const mongoose = require('mongoose');

const WORKING_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Doctor name is required'],
            trim: true,
            maxlength: [120, 'Doctor name cannot exceed 120 characters']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: undefined
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: undefined
        },
        specialty: {
            type: String,
            required: [true, 'Specialty is required'],
            trim: true,
            maxlength: [120, 'Specialty cannot exceed 120 characters']
        },
        hospital: {
            type: String,
            required: [true, 'Hospital is required'],
            trim: true,
            maxlength: [160, 'Hospital name cannot exceed 160 characters']
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
            maxlength: [160, 'Location cannot exceed 160 characters']
        },
        rating: {
            type: Number,
            default: 4.5,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot be greater than 5']
        },
        experience: {
            type: String,
            default: ''
        },
        distance: {
            type: String,
            default: ''
        },
        available: {
            type: Boolean,
            default: true
        },
        image: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        schedule: {
            workingDays: {
                type: [String],
                enum: WORKING_DAYS,
                default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
            },
            startTime: {
                type: String,
                default: '09:00'
            },
            endTime: {
                type: String,
                default: '17:00'
            },
            slotDurationMinutes: {
                type: Number,
                default: 30,
                min: [5, 'Slot duration cannot be less than 5 minutes'],
                max: [180, 'Slot duration cannot exceed 180 minutes']
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }
    },
    {
        timestamps: true
    }
);

doctorSchema.index({ specialty: 1, name: 1 });
doctorSchema.index({ user: 1 }, { unique: true, sparse: true });
doctorSchema.index(
    { email: 1 },
    {
        unique: true,
        partialFilterExpression: {
            email: { $type: 'string' }
        }
    }
);

module.exports = mongoose.model('Doctor', doctorSchema);
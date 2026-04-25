const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Doctor name is required'],
            trim: true,
            maxlength: [120, 'Doctor name cannot exceed 120 characters']
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
        }
    },
    {
        timestamps: true
    }
);

doctorSchema.index({ specialty: 1, name: 1 });

module.exports = mongoose.model('Doctor', doctorSchema);
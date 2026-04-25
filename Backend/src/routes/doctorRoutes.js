const express = require('express');
const { body, param } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const doctorPresenter = require('../presenters/DoctorPresenter');

const router = express.Router();

const ensureDoctorRole = (req, res, next) => {
    if (req.user?.role !== 'doctor') {
        return res.status(403).json({
            success: false,
            message: 'Only doctors can access this resource'
        });
    }

    next();
};

const updateAppointmentStatusValidation = [
    param('appointmentId')
        .trim()
        .notEmpty().withMessage('Appointment ID is required'),
    body('status')
        .trim()
        .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
        .withMessage('Status must be pending, confirmed, completed, or cancelled')
];

const createReferralValidation = [
    body('toDoctor')
        .trim()
        .notEmpty().withMessage('Receiving doctor is required'),
    body('patientName')
        .trim()
        .notEmpty().withMessage('Patient name is required')
        .isLength({ max: 120 }).withMessage('Patient name cannot exceed 120 characters'),
    body('reason')
        .trim()
        .notEmpty().withMessage('Referral reason is required')
        .isLength({ max: 1000 }).withMessage('Referral reason cannot exceed 1000 characters')
];

const updateReferralValidation = [
    param('referralId')
        .trim()
        .notEmpty().withMessage('Referral ID is required'),
    body('status')
        .trim()
        .isIn(['pending', 'accepted', 'rejected'])
        .withMessage('Status must be pending, accepted, or rejected')
];

const updateScheduleValidation = [
    body('workingDays')
        .isArray({ min: 1 }).withMessage('At least one working day is required'),
    body('workingDays.*')
        .isIn(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
        .withMessage('Working days must be valid day abbreviations (Mon-Sun)'),
    body('startTime')
        .trim()
        .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
        .withMessage('Start time must be in HH:mm format'),
    body('endTime')
        .trim()
        .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
        .withMessage('End time must be in HH:mm format'),
    body('slotDurationMinutes')
        .optional()
        .isInt({ min: 5, max: 180 })
        .withMessage('Slot duration must be between 5 and 180 minutes')
];

router.use(authMiddleware, ensureDoctorRole);

router.get('/dashboard', async (req, res, next) => {
    try {
        const result = await doctorPresenter.getDashboard(req.user._id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/appointments/:appointmentId/status', updateAppointmentStatusValidation, validate, async (req, res, next) => {
    try {
        const result = await doctorPresenter.updateAppointmentStatus(
            req.user._id,
            req.params.appointmentId,
            req.body.status
        );
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/referrals', createReferralValidation, validate, async (req, res, next) => {
    try {
        const result = await doctorPresenter.createReferral(req.user._id, req.body);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/referrals/:referralId/status', updateReferralValidation, validate, async (req, res, next) => {
    try {
        const result = await doctorPresenter.updateReferralStatus(
            req.user._id,
            req.params.referralId,
            req.body.status
        );
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/schedule', updateScheduleValidation, validate, async (req, res, next) => {
    try {
        const result = await doctorPresenter.updateSchedule(req.user._id, req.body);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
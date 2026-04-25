const express = require('express');
const { body, param } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const patientPresenter = require('../presenters/PatientPresenter');

const router = express.Router();

const ensurePatientRole = (req, res, next) => {
    if (req.user?.role !== 'patient') {
        return res.status(403).json({
            success: false,
            message: 'Only patients can access this resource'
        });
    }

    next();
};

const bookAppointmentValidation = [
    body('doctorId')
        .trim()
        .notEmpty().withMessage('Doctor ID is required'),
    body('date')
        .trim()
        .notEmpty().withMessage('Appointment date is required'),
    body('time')
        .trim()
        .notEmpty().withMessage('Appointment time is required'),
    body('reason')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters')
];

const cancelAppointmentValidation = [
    param('appointmentId')
        .trim()
        .notEmpty().withMessage('Appointment ID is required')
];

router.use(authMiddleware, ensurePatientRole);

router.get('/dashboard', async (req, res, next) => {
    try {
        const result = await patientPresenter.getDashboard(req.user._id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/doctors', async (req, res, next) => {
    try {
        const result = await patientPresenter.getDoctors({ specialty: req.query.specialty });
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/appointments', bookAppointmentValidation, validate, async (req, res, next) => {
    try {
        const result = await patientPresenter.bookAppointment(req.user._id, req.body);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/appointments/:appointmentId/cancel', cancelAppointmentValidation, validate, async (req, res, next) => {
    try {
        const result = await patientPresenter.cancelAppointment(req.user._id, req.params.appointmentId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
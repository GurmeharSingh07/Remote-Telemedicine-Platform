const express = require('express');
const { body } = require('express-validator');
const authPresenter = require('../presenters/AuthPresenter');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
        .optional()
        .isIn(['patient', 'doctor', 'admin']).withMessage('Role must be patient, doctor, or admin')
];

const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
];

router.post('/register', registerValidation, validate, async (req, res, next) => {
    try {
        const result = await authPresenter.register(req.body);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/login', loginValidation, validate, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authPresenter.login(email, password);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/profile', authMiddleware, async (req, res, next) => {
    try {
        const result = await authPresenter.getProfile(req.user._id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

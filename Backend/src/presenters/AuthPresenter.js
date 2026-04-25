const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

class AuthPresenter {

    async register(userData) {
        try {

            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                return {
                    success: false,
                    status: 400,
                    message: 'User already exists with this email'
                };
            }

            const user = await User.create(userData);

            const token = this.generateToken(user._id);

            return {
                success: true,
                status: 201,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt
                    },
                    token
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message
            };
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return {
                    success: false,
                    status: 401,
                    message: 'Invalid credentials'
                };
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return {
                    success: false,
                    status: 401,
                    message: 'Invalid credentials'
                };
            }

            const token = this.generateToken(user._id);

            return {
                success: true,
                status: 200,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt
                    },
                    token
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message
            };
        }
    }

    async getProfile(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return {
                    success: false,
                    status: 404,
                    message: 'User not found'
                };
            }

            return {
                success: true,
                status: 200,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message
            };
        }
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn
        });
    }
}

module.exports = new AuthPresenter();

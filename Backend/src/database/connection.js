const mongoose = require('mongoose');
const config = require('../config');

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(config.mongodbUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        console.log('Server will continue running without database connection');
    }
};

module.exports = connectDatabase;

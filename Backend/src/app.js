const express = require('express');
const config = require('./config');
const connectDatabase = require('./database/connection');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

connectDatabase();

const allowedOrigins = [config.frontendUrl, 'http://localhost:3000']
    .filter(Boolean)
    .map(origin => origin.replace(/\/$/, ''));

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin) {
        const normalizedOrigin = origin.replace(/\/$/, '');
        if (allowedOrigins.includes(normalizedOrigin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Vary', 'Origin');
        }
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

module.exports = app;

const express = require('express');
const config = require('./config');
const connectDatabase = require('./database/connection');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDatabase();

app.use(express.json());

app.use('/api/auth', authRoutes);

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

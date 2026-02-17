const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Auth Routes
const authRoutes = require('./routes/auth').default;
const questionRoutes = require('./routes/questions').default;

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

// Test endpoint for frontend-backend connection
app.post('/api/test', (req, res) => {
    const { message } = req.body;
    console.log(`Received message from frontend: ${message}`);
    res.json({
        status: 'success',
        message: `Backend received your message: "${message}"`,
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

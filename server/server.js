import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import { checkAndSendNotifications } from './services/notificationService.js';


import authRoutes from './routes/authRoutes.js';
import capsuleRoutes from './routes/capsuleRoutes.js';

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/capsules', capsuleRoutes);

// Scheduled Task: Check for capsules to unlock every day 
// cron.schedule('0 0 * * *', () => {
//     console.log('Running daily check for capsule unlocks...');
//     checkAndSendNotifications();
// }, {
//     timezone: "Asia/Kolkata" 
// });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
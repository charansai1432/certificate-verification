import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import route files
import internRoutes from './routes/intern.js';
import employeeRoutes from './routes/employee.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import certificateRoutes from './routes/certificateRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interns', internRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api', certificateRoutes);

// Serve static frontend files (React build)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve React's index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch((error) => console.error('✗ MongoDB connection error:', error));

// Routes
app.use('/api/items', itemRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Campus-Trace API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});

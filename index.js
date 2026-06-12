import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import contactRoutes from './routes/contact.routes.js';
import errorHandler from './middleware/errorHandler.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Standard middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Basic Root route
app.get('/', (req, res) => {
  res.send('Portfolio Server API is running...');
});

// API Routes
app.use('/api', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// Catch 404
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

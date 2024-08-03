import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { registerUser } from './controllers/registerController'; 
import { loginUser } from './controllers/loginController'; 

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Register and login routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Serve React app
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html')); 
});

// Error handling middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  } else {
    console.error('Unexpected error', err);
    res.status(500).json({ message: 'Unexpected server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

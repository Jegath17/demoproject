import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import todoRoutes from './routes/todos.js';

const app = express();

app.use(cors());
app.use(express.json());

// Make sure the database is connected before any route runs.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/todos', todoRoutes);

// Central error handler: Express calls this when a route passes an error to next(err).
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id' });
  }
  res.status(500).json({ message: 'Something went wrong' });
});

export default app;

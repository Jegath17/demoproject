import mongoose from 'mongoose';

// Serverless functions (Vercel) can be started many times, so we reuse one
// connection promise instead of opening a new connection on every request.
let connecting = null;

export function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();

  if (!connecting) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not set');

    connecting = mongoose.connect(uri).catch((err) => {
      connecting = null; // allow a retry on the next request
      throw err;
    });
  }
  return connecting;
}

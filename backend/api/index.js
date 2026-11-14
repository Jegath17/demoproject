// Vercel entry point. @vercel/node picks up the default export (the Express app)
// and runs it as a serverless function for every request under /api.
import app from '../app.js';

export default app;

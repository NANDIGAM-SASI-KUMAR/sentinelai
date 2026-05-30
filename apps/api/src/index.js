import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import alertRoutes from './routes/alerts.js';
import cameraRoutes from './routes/cameras.js';
import agentRoutes from './routes/agents.js';
import analyticsRoutes from './routes/analytics.js';
import { seed } from './services/seed.js';
import { initSockets } from './sockets/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 200 }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'sentinelai-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/cameras', cameraRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/analytics', analyticsRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);
initSockets(io);

const MONGO = process.env.MONGO_URI || 'mongodb://mongo:27017/sentinelai';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO).then(async () => {
  console.log('[api] mongo connected');
  await seed();
  server.listen(PORT, () => console.log(`[api] listening on ${PORT}`));
}).catch(err => {
  console.error('[api] mongo error', err.message);
  // start anyway so /health works during local dev
  server.listen(PORT, () => console.log(`[api] listening on ${PORT} (no db)`));
});

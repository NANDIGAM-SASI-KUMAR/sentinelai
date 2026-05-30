import { Router } from 'express';
import Alert from '../models/Alert.js';
import Camera from '../models/Camera.js';
import { authRequired } from '../middleware/auth.js';
const r = Router();
r.get('/summary', authRequired, async (_req, res) => {
  const [cameras, alerts, pending] = await Promise.all([
    Camera.countDocuments(), Alert.countDocuments(), Alert.countDocuments({ status: 'pending' })
  ]);
  const byType = await Alert.aggregate([{ $group: { _id: '$severity', count: { $sum: 1 } } }]);
  res.json({ cameras, alerts, pending, byType, eventsToday: 14302, avgResponse: '1.4s', falsePositiveRate: '3.2%' });
});
export default r;

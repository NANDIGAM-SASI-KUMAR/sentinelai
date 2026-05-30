import { Router } from 'express';
import Alert from '../models/Alert.js';
import AuditLog from '../models/AuditLog.js';
import { authRequired, requireRole } from '../middleware/auth.js';
const r = Router();

r.get('/', authRequired, async (_req, res) => {
  res.json(await Alert.find().sort({ createdAt: -1 }).limit(50).lean());
});

r.patch('/:id', authRequired, requireRole('super_admin','org_admin','manager'), async (req, res) => {
  const { status } = req.body; // confirmed | dismissed
  const alert = await Alert.findByIdAndUpdate(req.params.id, { status }, { new: true });
  await AuditLog.create({ actorId: req.user.id, action: `alert.${status}`, target: req.params.id });
  req.app.get('io').emit('alert:updated', alert);
  res.json(alert);
});
export default r;

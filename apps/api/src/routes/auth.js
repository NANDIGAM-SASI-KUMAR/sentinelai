import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sign, authRequired } from '../middleware/auth.js';
const r = Router();

r.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'email in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: role || 'operator' });
  res.json({ token: sign(user), user: { id: user._id, name, email, role: user.role } });
});

r.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  res.json({ token: sign(user), user: { id: user._id, name: user.name, email, role: user.role } });
});

r.get('/me', authRequired, async (req, res) => {
  res.json({ user: req.user });
});
export default r;

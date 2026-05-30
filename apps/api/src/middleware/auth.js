import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export function sign(user) {
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, SECRET, { expiresIn: '1d' });
}
export function authRequired(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'no token' });
  try { req.user = jwt.verify(token, SECRET); next(); }
  catch { return res.status(401).json({ error: 'invalid token' }); }
}
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role))
      return res.status(403).json({ error: 'forbidden' });
    next();
  };
}

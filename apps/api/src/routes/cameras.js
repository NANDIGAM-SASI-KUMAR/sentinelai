import { Router } from 'express';
import Camera from '../models/Camera.js';
import { authRequired } from '../middleware/auth.js';
const r = Router();
r.get('/', authRequired, async (_req, res) => res.json(await Camera.find().lean()));
export default r;

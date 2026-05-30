import { Router } from 'express';
import axios from 'axios';
import Alert from '../models/Alert.js';
import { authRequired } from '../middleware/auth.js';
const r = Router();
const AGENTS_URL = process.env.AGENTS_URL || 'http://agents:8000';

// Trigger the multi-agent pipeline on a detection event
r.post('/run', authRequired, async (req, res) => {
  const event = req.body.event || {
    camera: 'Camera 14', type: 'ppe_violation',
    detail: 'person without helmet near forklift', confidence: 0.94
  };
  try {
    const { data } = await axios.post(`${AGENTS_URL}/run`, { event }, { timeout: 60000 });
    let saved = null;
    if (data.alert) {
      saved = await Alert.create({
        title: data.alert.title, cameraName: event.camera,
        summary: data.alert.summary, severity: data.alert.severity,
        citations: data.citations || [], agentTrace: data.trace
      });
      req.app.get('io').emit('alert:new', saved);
    }
    res.json({ ...data, saved });
  } catch (e) {
    res.status(502).json({ error: 'agent service unavailable', detail: e.message });
  }
});
export default r;

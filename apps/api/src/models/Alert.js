import mongoose from 'mongoose';
const alertSchema = new mongoose.Schema({
  title: String, cameraName: String, summary: String,
  severity: { type: String, enum: ['low','medium','high','critical'], default: 'medium' },
  status: { type: String, enum: ['pending','confirmed','dismissed'], default: 'pending' },
  citations: [String], agentTrace: Object
}, { timestamps: true });
export default mongoose.model('Alert', alertSchema);

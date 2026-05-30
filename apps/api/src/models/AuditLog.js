import mongoose from 'mongoose';
const auditSchema = new mongoose.Schema({
  actorId: String, actorType: { type: String, default: 'user' },
  action: String, target: String
}, { timestamps: true });
export default mongoose.model('AuditLog', auditSchema);

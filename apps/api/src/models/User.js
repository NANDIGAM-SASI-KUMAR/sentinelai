import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  role: { type: String, enum: ['super_admin','org_admin','manager','operator','auditor'], default: 'operator' },
  status: { type: String, default: 'active' }
}, { timestamps: true });
export default mongoose.model('User', userSchema);

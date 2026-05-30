import mongoose from 'mongoose';
const cameraSchema = new mongoose.Schema({
  name: String, location: String,
  status: { type: String, enum: ['online','offline'], default: 'online' },
  rules: [String]
}, { timestamps: true });
export default mongoose.model('Camera', cameraSchema);

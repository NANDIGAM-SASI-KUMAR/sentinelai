import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Camera from '../models/Camera.js';
import Alert from '../models/Alert.js';

export async function seed() {
  if (await User.countDocuments() === 0) {
    await User.create({
      name: 'Admin', email: 'admin@sentinel.ai',
      passwordHash: await bcrypt.hash('Admin123!', 10), role: 'super_admin'
    });
    console.log('[seed] admin user created -> admin@sentinel.ai / Admin123!');
  }
  if (await Camera.countDocuments() === 0) {
    await Camera.insertMany([
      { name: 'Loading dock', location: 'Zone A', rules: ['PPE','proximity'] },
      { name: 'Main entrance', location: 'Lobby', rules: ['crowd','count'] },
      { name: 'Server room', location: 'Floor 2', rules: ['access','zone'] },
      { name: 'Parking lot', location: 'Exterior', status: 'offline', rules: ['loitering'] }
    ]);
  }
  if (await Alert.countDocuments() === 0) {
    await Alert.insertMany([
      { title: 'PPE violation detected', cameraName: 'Loading dock', summary: 'Worker without helmet near forklift', severity: 'high', citations: ['Safety Policy §3.1'] },
      { title: 'Restricted zone entry', cameraName: 'Server room', summary: 'Unscheduled access after hours', severity: 'critical', citations: ['Access Policy §4.2','Incident #2291'] },
      { title: 'Crowd density threshold', cameraName: 'Main entrance', summary: 'Occupancy exceeded safe limit', severity: 'medium', citations: [] }
    ]);
  }
}

import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
});

export const HRIntern = mongoose.model('HRIntern', internSchema, 'hr');
export const SoftwareIntern = mongoose.model('SoftwareIntern', internSchema, 'software developer');
export const TalentIntern = mongoose.model('TalentIntern', internSchema, 'talent acqusition');
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  program: { type: String, required: true },
  idNumber: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;

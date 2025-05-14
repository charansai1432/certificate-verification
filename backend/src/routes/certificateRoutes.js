// routes/certificateRoutes.js
import express from 'express';
import Certificate from '../models/certificateModel.js';

const router = express.Router();

router.post('/certificates', async (req, res) => {
  try {
    const newCert = new Certificate(req.body);
    await newCert.save();
    res.status(201).json({ message: 'Certificate saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving certificate' });
  }
});

router.get('/certificates/:idNumber', async (req, res) => {
  try {
    const cert = await Certificate.findOne({ idNumber: req.params.idNumber });
    if (!cert) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json({
      name: cert.name,
      program: cert.program,
      duration: cert.duration,
      company: 'GreatHire' // default
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching certificate' });
  }
});
export default router;

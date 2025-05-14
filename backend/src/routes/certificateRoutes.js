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

export default router;

import express from 'express';
import { HRIntern, SoftwareIntern, TalentIntern } from '../models/Intern.js';

const router = express.Router();

// ✅ Add Intern Route
router.post('/add', async (req, res) => {
  try {
    const internData = req.body;
    let newIntern;

    // Check if ID already exists in any collection
    const exists = await Promise.any([
      HRIntern.findOne({ id: internData.id }),
      SoftwareIntern.findOne({ id: internData.id }),
      TalentIntern.findOne({ id: internData.id }),
    ]).catch(() => null); // Catch if all fail

    if (exists) {
      return res.status(409).json({ message: 'Intern ID already exists' });
    }

    // Save to the appropriate collection based on department
    switch (internData.department.toLowerCase()) {
      case 'hr':
        newIntern = new HRIntern(internData);
        break;
      case 'software':
      case 'software developer':
        newIntern = new SoftwareIntern(internData);
        break;
      case 'talent acquisition':
      case 'talent acqusition': // support typo as well
        newIntern = new TalentIntern(internData);
        break;
      default:
        return res.status(400).json({ message: 'Invalid department' });
    }

    const savedIntern = await newIntern.save();
    res.status(201).json({ message: 'Intern added successfully', intern: savedIntern });
  } catch (error) {
    console.error('Add Intern Error:', error);
    res.status(500).json({ message: 'Failed to add intern', error: error.message });
  }
});

// ✅ Verify Intern Route
// ✅ Verify Intern Route
router.get('/verify/:id', async (req, res) => {
  try {
    console.log("Verifying intern ID:", req.params.id);

    // Query all collections
    const interns = await Promise.all([
      HRIntern.findOne({ id: req.params.id }),
      SoftwareIntern.findOne({ id: req.params.id }),
      TalentIntern.findOne({ id: req.params.id })
    ]);

    // Find the intern that exists
    const foundIntern = interns.find(intern => intern !== null);

    if (!foundIntern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    console.log("Intern found:", foundIntern);
    res.status(200).json(foundIntern);
  } catch (err) {
    console.error("Error in /verify route:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;

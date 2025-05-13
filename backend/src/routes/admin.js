import express from 'express';
import Employee from '../models/Employee.js';
import { HRIntern, SoftwareIntern, TalentIntern } from '../models/Intern.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    // Count employees
    const totalEmployees = await Employee.countDocuments();

    // Count interns from each intern collection
    const hrCount = await HRIntern.countDocuments();
    const softwareCount = await SoftwareIntern.countDocuments();
    const talentCount = await TalentIntern.countDocuments();
    const totalInterns = hrCount + softwareCount + talentCount;

    // Get distinct departments from each collection
    const employeeDepartments = await Employee.distinct('department');
    const hrDepts = await HRIntern.distinct('department');
    const softwareDepts = await SoftwareIntern.distinct('department');
    const talentDepts = await TalentIntern.distinct('department');

    // Merge all departments into a unique Set
    const allDepartments = new Set([
      ...employeeDepartments,
      ...hrDepts,
      ...softwareDepts,
      ...talentDepts
    ]);

    // Respond with computed stats
    res.json({
      totalEmployees,
      totalInterns,
      departments: allDepartments.size,
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

export default router;

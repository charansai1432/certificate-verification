import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// Add new employee
router.post('/add', async (req, res) => {
  try {
    const {
      employeeId, name, gender, role, department, companyName,
      email, phone, salary, joiningDate, address, experience
    } = req.body;

    const existing = await Employee.findOne({ employeeId });
    if (existing) {
      return res.status(409).json({ message: 'Employee ID already exists' });
    }

    const newEmployee = new Employee({
      employeeId, name, gender, role, department, companyName,
      email, phone, salary, joiningDate, address, experience
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Failed to add employee', error: error.message });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({  employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

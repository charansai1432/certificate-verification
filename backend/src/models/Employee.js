import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: String,
  gender: String,
  role: String,
  department: String,
  companyName: String,
  email: String,
  phone: String,
  salary: String,
  joiningDate: String,
  address: String,
  experience: String,
}, { timestamps: true });

export const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;

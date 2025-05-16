import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './AddForm.css';

interface FormData {
  name: string;
  gender: string;
  role: string;
  department: string;
  companyName: string;
  email: string;
  phone: string;
  salary: string;
  joiningDate: string;
  address: string;
  experience: string;
}

const API_BASE = import.meta.env.VITE_API_URL;
const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    role: '',
    department: '',
    companyName: 'GreatHire',
    email: '',
    phone: '',
    salary: '',
    joiningDate: '',
    address: '',
    experience: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    //if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    let uniqueId = '';
let isUnique = false;
let employeeId = '';
// Generate until a unique ID is accepted by backend
while (!isUnique) {
  employeeId = `EMP${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const checkResponse = await fetch(`${API_BASE}/interns/verify/${employeeId}`);
  if (checkResponse.status === 404) {
    isUnique = true;
  }
}

const payload = { ...formData, employeeId: employeeId };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/employee/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Employee added successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Failed to add employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="add-form-container fade-in">
      <div className="form-header">
        <h2>Add New Employee</h2>
        <p>Enter the details of the new employee</p>
      </div>
      
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              {errors.name && <div className="form-error"><AlertCircle size={14} /> {errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="gender" className="form-label">Gender *</label>
              <select
                id="gender"
                name="gender"
                className={`form-select ${errors.gender ? 'error' : ''}`}
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && <div className="form-error"><AlertCircle size={14} /> {errors.gender}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
              {errors.email && <div className="form-error"><AlertCircle size={14} /> {errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              {errors.phone && <div className="form-error"><AlertCircle size={14} /> {errors.phone}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="form-input"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Employment Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role" className="form-label">Job Title *</label>
              <input
                type="text"
                id="role"
                name="role"
                className={`form-input ${errors.role ? 'error' : ''}`}
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
              />
              {errors.role && <div className="form-error"><AlertCircle size={14} /> {errors.role}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="department" className="form-label">Department *</label>
              <select
                id="department"
                name="department"
                className={`form-select ${errors.department ? 'error' : ''}`}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select department</option>
                <option value="HR">HR</option>
                <option value="software developer">Software Development</option>
                <option value="talent acquisition">Talent Acquisition</option>
                {/* <option value="Marketing">Marketing</option> */}
                {/* <option value="Finance">Finance</option> */}
                {/* <option value="Operations">Operations</option> */}
              </select>
              {errors.department && <div className="form-error"><AlertCircle size={14} /> {errors.department}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary" className="form-label">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="form-input"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="experience" className="form-label">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                className="form-input"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5 years"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="joiningDate" className="form-label">Joining Date </label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                className={`form-input ${errors.joiningDate ? 'error' : ''}`}
                value={formData.joiningDate}
                onChange={handleChange}
              />
              {errors.joiningDate && <div className="form-error"><AlertCircle size={14} /> {errors.joiningDate}</div>}
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Employee'}
            {!isSubmitting && <UserPlus size={16} className="btn-icon" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
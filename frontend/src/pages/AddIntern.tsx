import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './AddForm.css';

interface FormData {
  id: string;
  name: string;
  gender: string;
  role: string;
  department: string;
  company: string;
  email: string;
  phone: string;
  education: string;
  startDate: string;
  endDate: string;
  mentor: string;
}
const API_BASE = import.meta.env.VITE_API_URL ;
const AddIntern: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    gender: '',
    role: '',
    department: '',
    company: 'GreatHire',
    email: '',
    phone: '',
    education: '',
    startDate: '',
    endDate: '',
    mentor: ''
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
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    
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

// Generate until a unique ID is accepted by backend
while (!isUnique) {
  uniqueId = `INTERN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const checkResponse = await fetch(`${API_BASE}/interns/verify/${uniqueId}`);
  if (checkResponse.status === 404) {
    isUnique = true;
  }
}

const payload = { ...formData, id: uniqueId };

  
    try {
      const response = await fetch(`${API_BASE}/interns/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Intern added successfully!');
         navigate('/dashboard');
      } else {
        toast.error(data.message || 'Failed to add intern');
      }
    } catch (error) {
      console.error('Error adding intern:', error);
      toast.error('Failed to add intern. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  return (
    <div className="add-form-container fade-in">
      <div className="form-header">
        <h2>Add New Intern</h2>
        <p>Enter the details of the new intern</p>
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
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Internship Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role" className="form-label">Role *</label>
              <input
                type="text"
                id="role"
                name="role"
                className={`form-input ${errors.role ? 'error' : ''}`}
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Software Engineer Intern"
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
                <option value="talent acqusition">Talent Acquisition</option>
                {/* <option value="Marketing">Marketing</option> */}
                {/* <option value="Finance">Finance</option> */}
                {/* <option value="Operations">Operations</option> */}
              </select>
              {errors.department && <div className="form-error"><AlertCircle size={14} /> {errors.department}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="education" className="form-label">Education</label>
              <input
                type="text"
                id="education"
                name="education"
                className="form-input"
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mentor" className="form-label">Mentor</label>
              <input
                type="text"
                id="mentor"
                name="mentor"
                className="form-input"
                value={formData.mentor}
                onChange={handleChange}
                placeholder="Enter mentor's name"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate" className="form-label">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className={`form-input ${errors.startDate ? 'error' : ''}`}
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && <div className="form-error"><AlertCircle size={14} /> {errors.startDate}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="form-input"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Intern'}
            {!isSubmitting && <UserPlus size={16} className="btn-icon" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIntern;
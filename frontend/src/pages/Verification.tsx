import React, { useState } from 'react';
import { CheckCircle, X, Info } from 'lucide-react';

const Verification = () => {
  const [formData, setFormData] = useState({
    requesterName: '',
    requesterCompany: '',
    requesterEmail: '',
    requesterPhone: '',
    employeeId: '',
    employeeName: '',
    verificationType: 'employment',
    additionalInfo: '',
    consent: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.requesterName.trim()) newErrors.requesterName = 'Requester name is required';
    if (!formData.requesterCompany.trim()) newErrors.requesterCompany = 'Company name is required';
    if (!formData.requesterEmail.trim()) newErrors.requesterEmail = 'Email is required';
    if (!formData.requesterPhone.trim()) newErrors.requesterPhone = 'Phone number is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required';
    if (!formData.consent) newErrors.consent = 'You must confirm you have consent';
    
    if (formData.requesterEmail && !/\S+@\S+\.\S+/.test(formData.requesterEmail)) {
      newErrors.requesterEmail = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, this would send the data to an API
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      requesterName: '',
      requesterCompany: '',
      requesterEmail: '',
      requesterPhone: '',
      employeeId: '',
      employeeName: '',
      verificationType: 'employment',
      additionalInfo: '',
      consent: false,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Verification Request</h1>
          <p className="mt-1 text-gray-500">Submit a request to verify an employee's information</p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="card p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Verification Request Submitted</h2>
          <p className="text-gray-500 mb-6">
            Your verification request for {formData.employeeName} has been submitted successfully. 
            You will receive a confirmation email shortly with the request details.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Reference Number</h3>
                <p className="text-sm text-blue-700 mt-1">
                  VR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-{new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
          <button onClick={resetForm} className="btn-primary">
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Requester Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="requesterName" className="form-label">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="requesterName"
                  name="requesterName"
                  value={formData.requesterName}
                  onChange={handleChange}
                  className={`form-input ${errors.requesterName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.requesterName && <p className="mt-1 text-sm text-red-600">{errors.requesterName}</p>}
              </div>
              <div>
                <label htmlFor="requesterCompany" className="form-label">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="requesterCompany"
                  name="requesterCompany"
                  value={formData.requesterCompany}
                  onChange={handleChange}
                  className={`form-input ${errors.requesterCompany ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.requesterCompany && <p className="mt-1 text-sm text-red-600">{errors.requesterCompany}</p>}
              </div>
              <div>
                <label htmlFor="requesterEmail" className="form-label">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="requesterEmail"
                  name="requesterEmail"
                  value={formData.requesterEmail}
                  onChange={handleChange}
                  className={`form-input ${errors.requesterEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.requesterEmail && <p className="mt-1 text-sm text-red-600">{errors.requesterEmail}</p>}
              </div>
              <div>
                <label htmlFor="requesterPhone" className="form-label">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="requesterPhone"
                  name="requesterPhone"
                  value={formData.requesterPhone}
                  onChange={handleChange}
                  className={`form-input ${errors.requesterPhone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.requesterPhone && <p className="mt-1 text-sm text-red-600">{errors.requesterPhone}</p>}
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Employee Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employeeId" className="form-label">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className={`form-input ${errors.employeeId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
              </div>
              <div>
                <label htmlFor="employeeName" className="form-label">
                  Employee Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  className={`form-input ${errors.employeeName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.employeeName && <p className="mt-1 text-sm text-red-600">{errors.employeeName}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="verificationType" className="form-label">
                  Verification Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="verificationType"
                  name="verificationType"
                  value={formData.verificationType}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="employment">Employment Verification</option>
                  <option value="employment-salary">Employment & Salary Verification</option>
                  <option value="employment-history">Employment History Verification</option>
                  <option value="education">Education Verification</option>
                  <option value="background">Background Check</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="additionalInfo" className="form-label">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Add any specific information you need verified"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consent" className={`font-medium ${errors.consent ? 'text-red-700' : 'text-gray-700'}`}>
                  Consent Confirmation <span className="text-red-500">*</span>
                </label>
                <p className={errors.consent ? 'text-red-500' : 'text-gray-500'}>
                  I confirm that I have the necessary consent from the employee to request this verification.
                </p>
                {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={resetForm} className="btn-secondary">
              Reset
            </button>
            <button type="submit" className="btn-primary">
              Submit Verification Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Verification;
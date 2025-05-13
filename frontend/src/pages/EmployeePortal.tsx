import { useState } from 'react';
import { Search, User, Briefcase, Calendar, AlertCircle } from 'lucide-react';

interface EmployeeDetails {
  name: string;
  department: string;
  gender: string;
  joinDate: string;
  position: string;
}

const EmployeePortal = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails | null>(null);

  const handleVerification = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setEmployeeDetails(null);

  try {
    const response = await fetch(`http://localhost:5000/api/employee/${employeeId}`);
    
    if (!response.ok) {
      throw new Error('Employee not found');
    }

    const data = await response.json();
    setEmployeeDetails(data);
  } catch (err: any) {
    setError(err.message || 'An error occurred while fetching employee details.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Employee Portal
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Employee ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., EMP123"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !employeeId}
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'View Details'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {employeeDetails && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Employee Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <User className="h-5 w-5 text-sky-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-medium text-gray-900">{employeeDetails.name}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-sky-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="text-lg font-medium text-gray-900">
                  {employeeDetails.department} 
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <User className="h-5 w-5 text-sky-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg font-medium text-gray-900">{employeeDetails.gender}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-sky-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Join Date</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(employeeDetails.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePortal;
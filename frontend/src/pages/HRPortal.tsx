import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Calendar, Building } from 'lucide-react';

interface InternshipDetails {
  name: string;
  department: string;
  company: string;
  startDate: string;
  endDate: string;
  isVerified: boolean;
}

const HRPortal = () => {
  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [internshipDetails, setInternshipDetails] = useState<InternshipDetails | null>(null);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Mock API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (certificateId === 'CERT-2024-001') { // Mock successful verification
        setInternshipDetails({
          name: 'John Doe',
          department: 'Software Development',
          company: 'Tech Solutions Inc.',
          startDate: '2024-04-01',
          endDate: '2024-07-31',
          isVerified: true
        });
      } else {
        setError('Invalid certificate ID. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred while verifying the certificate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        HR Certificate Verification Portal
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Certificate ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., CERT-2024-001"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !certificateId}
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Certificate'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {internshipDetails && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            {internshipDetails.isVerified ? (
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {internshipDetails.isVerified ? 'Valid Certificate' : 'Invalid Certificate'}
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Intern Name</p>
              <p className="text-lg font-medium text-gray-900">{internshipDetails.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-lg font-medium text-gray-900">{internshipDetails.department}</p>
            </div>

            <div className="flex items-center">
              <Building className="h-5 w-5 text-sky-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="text-lg font-medium text-gray-900">{internshipDetails.company}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-sky-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Internship Period</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(internshipDetails.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  {' '} to {' '}
                  {new Date(internshipDetails.endDate).toLocaleDateString('en-US', {
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

export default HRPortal;
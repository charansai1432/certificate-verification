import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Calendar, Building } from 'lucide-react';

interface InternshipDetails {
  name: string;
  department: string;
  company: string;
  duration: string;
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
    setInternshipDetails(null);

    try {
      const response = await fetch(`https://emp.greathire.in/api/certificates/${certificateId}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Invalid certificate ID. Please check and try again.');
        } else {
          setError('An error occurred while verifying the certificate.');
        }
        return;
      }

      const data = await response.json();
      setInternshipDetails({
        name: data.name,
        department: data.program,
        company: data.company || 'GreatHire',
        duration: data.duration,
        isVerified: true
      });
    } catch (err) {
      console.error(err);
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
                placeholder="e.g., 61243567"
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
                <p className="text-sm text-gray-500">Internship Duration</p>
                <p className="text-lg font-medium text-gray-900">{internshipDetails.duration}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRPortal;

import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Download } from 'lucide-react';

interface InternDetails {
  name?: string;
  department?: string;
  gender?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  company?: string;
}

const InternVerification = () => {
  const [internId, setInternId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [internDetails, setInternDetails] = useState<InternDetails | null>(null);

  const fetchInternDetails = async (id: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/interns/verify/${internId}`);
  // Adjust port if needed
      if (!res.ok) {
        throw new Error('Intern not found');
      }
      const data = await res.json();
      setInternDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setInternDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internId) return;
    await fetchInternDetails(internId);
  };

  const generateCertificate = () => {
    if (!internDetails) return;

    const certificateContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .certificate {
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              border: 2px solid #0EA5E9;
              text-align: center;
            }
            .header { font-size: 32px; color: #0EA5E9; margin-bottom: 20px; }
            .content { font-size: 18px; line-height: 1.6; margin: 20px 0; }
            .footer { margin-top: 40px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">Internship Certificate</div>
            <div class="content">
              This is to certify that<br/>
              <strong>${internDetails.name || 'Unnamed Intern'}</strong><br/>
              has successfully completed an internship as<br/>
              <strong>${internDetails.role || 'Role not specified'}</strong><br/>
              in the ${internDetails.department || 'Unknown'} department at<br/>
              <strong>${internDetails.company || 'Unnamed Company'}</strong><br/>
              from ${internDetails.startDate ? new Date(internDetails.startDate).toLocaleDateString() : 'N/A'} to ${internDetails.endDate ? new Date(internDetails.endDate).toLocaleDateString() : 'N/A'}
            </div>
            <div class="footer">
              Date of Issue: ${new Date().toLocaleDateString()}
            </div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([certificateContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `internship_certificate_${internId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Internship Certificate Verification
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <label htmlFor="internId" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Intern ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="internId"
                value={internId}
                onChange={(e) => setInternId(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Enter your intern ID"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !internId}
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

      {internDetails && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Certificate Verified</h2>
          </div>

          <div className="space-y-4 mb-6">
            {['name', 'department', 'role', 'gender', 'company'].map((field) => (
              <div key={field}>
                <p className="text-sm text-gray-500">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                <p className="text-lg font-medium text-gray-900">
                  {internDetails?.[field as keyof InternDetails] || 'N/A'}
                </p>
              </div>
            ))}
            <div>
              <p className="text-sm text-gray-500">Internship Period</p>
              <p className="text-lg font-medium text-gray-900">
                {internDetails.startDate && internDetails.endDate
                  ? `${new Date(internDetails.startDate).toLocaleDateString()} to ${new Date(internDetails.endDate).toLocaleDateString()}`
                  : 'N/A'}
              </p>
            </div>
          </div>

          <button
            onClick={generateCertificate}
            className="flex items-center justify-center w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default InternVerification;

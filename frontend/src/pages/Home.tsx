import { Link } from 'react-router-dom';
import { UserCheck, Users, Building2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to GreatHire Verification Portal
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Verify internship certificates, access employee information, and manage verifications all in one place
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Link 
          to="/intern-verification"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-sky-500 transition-colors group"
        >
          <UserCheck className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Intern Verification</h2>
          <p className="text-gray-600">
            Verify your intern details using your unique intern ID
          </p>
        </Link>

        <Link 
          to="/employee-portal"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-sky-500 transition-colors group"
        >
          <Users className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Employee Portal</h2>
          <p className="text-gray-600">
            Access your employee information with your employee ID
          </p>
        </Link>

        <Link 
          to="/hr-portal"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-sky-500 transition-colors group"
        >
          <Building2 className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">HR Portal</h2>
          <p className="text-gray-600">
            Verify and manage intern certificates 
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
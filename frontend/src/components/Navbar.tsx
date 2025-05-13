import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-sky-500" />
            <span className="text-xl font-bold text-gray-900">GreatHire</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              to="/intern-verification" 
              className="text-gray-600 hover:text-sky-500 transition-colors"
            >
              Intern Verification
            </Link>
            <Link 
              to="/employee-portal" 
              className="text-gray-600 hover:text-sky-500 transition-colors"
            >
              Employee Portal
            </Link>
            <Link 
              to="/hr-portal" 
              className="text-gray-600 hover:text-sky-500 transition-colors"
            >
              HR Portal
            </Link>
            {/* {isAuthenticated && isAdmin() && (
              <Link 
                to="/admin" 
                className="text-gray-600 hover:text-sky-500 transition-colors"
              >
                Admin Panel
              </Link>
            )}
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-sky-500 transition-colors"
              >
                Login
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
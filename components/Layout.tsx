
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, Menu, X, Calendar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
      <Link to="/doctors" className="hover:text-blue-600 font-medium">Find Doctors</Link>
      {user ? (
        <>
          {user.role === 'PATIENT' && <Link to="/patient-dashboard" className="hover:text-blue-600 font-medium">My Appointments</Link>}
          {user.role === 'DOCTOR' && <Link to="/doctor-dashboard" className="hover:text-blue-600 font-medium">Doctor Panel</Link>}
          {user.role === 'ADMIN' && <Link to="/admin-dashboard" className="hover:text-blue-600 font-medium">Admin Dashboard</Link>}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/login" className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 text-center">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-center">Join Us</Link>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Heart className="text-white w-6 h-6" fill="white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">Med<span className="text-blue-600">Connect</span></span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 flex flex-col shadow-lg">
            <NavLinks />
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <Heart className="text-blue-400 w-8 h-8" fill="currentColor" />
                <span className="text-2xl font-bold tracking-tight">MedConnect</span>
              </Link>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Dedicated to providing accessible, high-quality healthcare scheduling for everyone. Book your next appointment in seconds.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/doctors" className="hover:text-blue-400 transition-colors">Find a Doctor</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">Stay updated with the latest medical advice and clinic news.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500" />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors">Join</button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MedConnect Health Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

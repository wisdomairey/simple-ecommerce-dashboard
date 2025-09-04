import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/common/Logo';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const { login, register, isAuthenticated, loading, error, clearError } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    clearError();
    
    const result = await login(formData);
    if (result.success) {
      // Redirect will happen automatically due to auth state change
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    clearError();
    
    if (registrationData.password.length < 6) {
      return;
    }
    
    const result = await register(registrationData);
    if (result.success) {
      // Redirect will happen automatically due to auth state change
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isRegisterMode) {
      setRegistrationData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mb-6">
            <Logo size="lg" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {isRegisterMode ? 'Create Admin Account' : 'Admin Dashboard'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegisterMode 
              ? 'Set up your admin account for NexaShop'
              : 'Sign in to manage your store'
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          <div className="space-y-4">
            {isRegisterMode && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="sr-only">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={registrationData.firstName}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={registrationData.lastName}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={isRegisterMode ? registrationData.email : formData.email}
                onChange={handleInputChange}
                className="input pl-10"
                placeholder="Email address"
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                required
                value={isRegisterMode ? registrationData.password : formData.password}
                onChange={handleInputChange}
                className="input pl-10 pr-10"
                placeholder="Password"
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {isRegisterMode && registrationData.password && registrationData.password.length < 6 && (
              <p className="text-sm text-red-600">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 mr-2"></div>
                  {isRegisterMode ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isRegisterMode ? 'Create Admin Account' : 'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                clearError();
              }}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {isRegisterMode 
                ? 'Already have an account? Sign in'
                : 'Need to create an admin account? Register'
              }
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

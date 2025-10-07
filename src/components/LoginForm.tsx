import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  const handleDemoLogin = (credentials: { username: string; password: string }) => {
    setUsername(credentials.username);
    setPassword(credentials.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            LP Investment Portal
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign in to access your investment dashboard
          </p>
        </div>

        {/* Demo Credentials */}
        {showDemo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-blue-900">Demo Accounts</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-blue-600 hover:text-blue-800 text-xs"
              >
                Hide
              </button>
            </div>
            <div className="space-y-2">
              {DEMO_CREDENTIALS.map((cred, index) => (
                <div key={index} className="bg-white rounded p-3 text-xs">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">{cred.company}</div>
                      <div className="text-gray-600">{cred.description}</div>
                    </div>
                    <button
                      onClick={() => handleDemoLogin(cred)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-gray-700">
                    <div>Username: <span className="font-mono">{cred.username}</span></div>
                    <div>Password: <span className="font-mono">{cred.password}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white rounded-xl shadow-xl p-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-10 py-3 pr-10 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign in</span>
                </div>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600">
              Secure access to your investment portfolio and documents
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
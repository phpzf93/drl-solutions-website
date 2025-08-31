import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { Lock, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAdmin } = useStore();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Demo credentials - In production, use proper authentication
  const ADMIN_CREDENTIALS = {
    username: 'admin@drl-softechs.dev',
    password: 'DRL2024Admin!'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('🔐 Admin login attempt:', {
        username: formData.username,
        expectedUsername: ADMIN_CREDENTIALS.username,
        passwordLength: formData.password.length,
        expectedPasswordLength: ADMIN_CREDENTIALS.password.length
      });

      // Validate input
      if (!formData.username || !formData.password) {
        setError('Please enter both username and password.');
        setLoading(false);
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials (case-sensitive)
      if (
        formData.username.trim() === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        // Set admin session
        const adminUser = {
          id: 'admin_001',
          name: 'DRL Solutions Admin',
          email: formData.username.trim(),
          role: 'admin',
          loginTime: new Date().toISOString()
        };

        console.log('✅ Admin login successful, setting admin user:', adminUser);
        
        setAdmin(adminUser);
        localStorage.setItem('drl_admin_session', JSON.stringify(adminUser));
        
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Redirect after success message
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
        
      } else {
        console.log('❌ Admin login failed - invalid credentials');
        setError('Invalid username or password. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('❌ Admin login error:', error);
      setError('Login failed due to a system error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      username: ADMIN_CREDENTIALS.username,
      password: ADMIN_CREDENTIALS.password
    });
    setError('');
    setSuccess('Demo credentials filled. Click "Sign In" to continue.');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white border-gray-200 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-full shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-black text-2xl font-bold">Admin Login</CardTitle>
              <p className="text-gray-600 text-sm">DRL Solutions Dashboard Access</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 animate-pulse">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <p className="text-green-600 text-sm">{success}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-black font-medium">Username / Email</Label>
                    <Input
                      id="username"
                      name="username"
                      type="email"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="admin@drl-softechs.dev"
                      className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-black font-medium">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="bg-white border-gray-300 text-black placeholder:text-gray-400 pr-10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Lock className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Sign In to Dashboard
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={fillDemoCredentials}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 transition-all duration-200"
                    disabled={loading}
                  >
                    Fill Demo Credentials
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500 space-y-2">
                  <p>🔒 Secure admin access for DRL Solutions</p>
                  <div className="bg-gray-50 rounded-lg p-3 text-xs">
                    <p className="font-medium text-gray-700 mb-1">Demo Credentials:</p>
                    <p><strong>Email:</strong> admin@drl-softechs.dev</p>
                    <p><strong>Password:</strong> DRL2024Admin!</p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
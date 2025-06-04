
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Data dummy untuk testing
const DUMMY_USERS = [
  { email: 'user@free.com', password: 'password123', plan: 'free', name: 'Free User' },
  { email: 'user@premium.com', password: 'password123', plan: 'premium', name: 'Premium User' },
  { email: 'admin@test.com', password: 'admin123', plan: 'premium', name: 'Admin User' }
];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi delay login
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Login menggunakan AuthContext
      login({
        email: user.email,
        name: user.name,
        plan: user.plan as 'free' | 'premium'
      });
      
      toast({
        title: "Login Berhasil",
        description: `Selamat datang ${user.name}! Plan Anda: ${user.plan}`,
      });
      
      navigate('/');
    } else {
      toast({
        title: "Login Gagal",
        description: "Email atau password salah",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const fillDummyData = (userType: 'free' | 'premium') => {
    const user = DUMMY_USERS.find(u => u.plan === userType);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Bot className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Login Bot Studio</CardTitle>
          <CardDescription>
            Masuk ke akun Anda untuk mulai membuat chatbot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="masukkan password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>

          {/* Dummy Data Buttons untuk Testing */}
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600 text-center">Data dummy untuk testing:</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fillDummyData('free')}
                className="flex-1"
              >
                User Free
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fillDummyData('premium')}
                className="flex-1"
              >
                User Premium
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Daftar disini
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

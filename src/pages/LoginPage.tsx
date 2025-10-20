import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/forms/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/Toast';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials.email, credentials.password);
      toast.showToast('Signed in', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      toast.showToast(err?.message || 'Login failed', 'error');
      throw err;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;

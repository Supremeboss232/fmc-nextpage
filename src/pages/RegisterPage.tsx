import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/forms/RegisterForm';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/Toast';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (payload: { name: string; email: string; password: string }) => {
    try {
      await register(payload.name, payload.email, payload.password);
      toast.showToast('Account created', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      toast.showToast(err?.message || 'Registration failed', 'error');
      throw err;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create an account</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;

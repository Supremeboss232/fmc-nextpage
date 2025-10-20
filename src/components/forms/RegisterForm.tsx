import React, { useState } from 'react';
import { isEmail, passwordStrength } from '../../utils/validators';

type Props = {
  onSubmit: (payload: { name: string; email: string; password: string }) => Promise<void>;
};

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!isEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (confirm !== password) {
      setError('Passwords do not match');
      return;
    }
    const strength = passwordStrength(password);
    if (strength.score < 2) {
      setError('Password is too weak');
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ name, email, password });
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-md">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div>
        <label className="text-sm">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label className="text-sm">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label className="text-sm">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label className="text-sm">Confirm Password</label>
        <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-brand-500 text-white">
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

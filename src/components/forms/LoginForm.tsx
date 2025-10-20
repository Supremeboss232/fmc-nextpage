import React, { useState } from 'react';
import { isEmail } from '../../utils/validators';

type Props = {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  initial?: { email?: string };
};

const LoginForm: React.FC<Props> = ({ onSubmit, initial }) => {
  const [email, setEmail] = useState(initial?.email ?? '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ email, password });
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-md">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div>
        <label className="text-sm">Email</label>
        <input
          className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label className="text-sm">Password</label>
        <input
          className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-brand-500 text-white disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

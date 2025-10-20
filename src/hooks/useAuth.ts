import { useCallback } from 'react';
import { authLogin, authRegister } from '../api';
import { useGlobal } from '../context/GlobalContext';
import type { User } from '../types/global';

export function useAuth() {
  const { user, token, login, logout } = useGlobal();

  const doLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await authLogin({ email, password });
        login(res.token, res.user as User);
        return res.user;
      } catch (err) {
        throw err;
      }
    },
    [login]
  );

  const doRegister = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const res = await authRegister({ name, email, password });
        login(res.token, res.user as User);
        return res.user;
      } catch (err) {
        throw err;
      }
    },
    [login]
  );

  return {
    user,
    token,
    login: doLogin,
    register: doRegister,
    logout,
    isAuthenticated: Boolean(user && token)
  };
}

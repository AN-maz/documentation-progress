import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../api/auth.service';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const login = async (email, password) => {
      setLoading(true);
      try {
        const response = await authService.login({ email, password });
        const { user, token } = response.data;
        setAuth(user, token);

        toast.success(response.message || 'Berhasil masuk!');
        return { success: true, data: response.data };
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Gagal melakukan login';
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      toast.success(response.message || 'Registrasi berhasil! Silakan login.');
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Gagal mendaftar';
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutStore();
    toast.success('Berhasil keluar');
    navigate('/auth');
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
};
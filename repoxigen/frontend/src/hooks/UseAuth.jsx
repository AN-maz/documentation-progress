import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const login = async (email, password) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await authService.login(email, password);
      if (res.status || res.success) {
        navigate('/dashboard/user');
        return res;
      }
      setErrorMsg(res.message || "Login gagal");
    } catch (err) {
      setErrorMsg(err.message || "Email atau Password Salah!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setErrorMsg('');
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.message || "Gagal Mendaftar.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, errorMsg, setErrorMsg };
};
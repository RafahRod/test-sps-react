import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await UserService.list();
      setUsers(response.users || []);
    } catch (error) {
      if (error.message.includes('Sessão expirada')) {
        logout();
        navigate('/signin');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  const createUser = useCallback(async (userData) => {
    try {
      setError('');
      await UserService.create(userData);
      await loadUsers();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [loadUsers]);

  const updateUser = useCallback(async (id, userData) => {
    try {
      setError('');
      await UserService.update(id, userData);
      await loadUsers();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [loadUsers]);

  const deleteUser = useCallback(async (id) => {
    try {
      setError('');
      await UserService.delete(id);
      await loadUsers();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [loadUsers]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    clearError
  };
};

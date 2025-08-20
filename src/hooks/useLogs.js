import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/logs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar logs');
      }

      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLogsByOperation = useCallback(async (operation) => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/logs/operation/${operation}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar logs');
      }

      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLogsByUser = useCallback(async (userEmail) => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/logs/user/${userEmail}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar logs');
      }

      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.type === 'admin') {
      fetchLogs();
    }
  }, [fetchLogs, user?.type]);

  return {
    logs,
    loading,
    error,
    fetchLogs,
    fetchLogsByOperation,
    fetchLogsByUser
  };
};

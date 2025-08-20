import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import Header from '../components/Layout/Header';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import UserService from '../services/UserService';

export function userLoader({ params }) {
  const user = {
    id: params.userId,
    name: "teste",
    email: "teste@gmail.com",
  };

  return { user };
}

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'user',
    password: ''
  });

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await UserService.get(userId);
      const userData = response.user;
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        type: userData.type || 'user',
        password: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const dataToSend = { ...formData };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      await UserService.update(userId, dataToSend);
      navigate('/users');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (loading) {
    return (
      <>
        <Header title="Editar Usuário" showLogout={false} />
        <Container>
          <LoadingSpinner message="Carregando usuário..." />
        </Container>
      </>
    );
  }

  return (
    <>
      <Header title="Editar Usuário" showLogout={false} />
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/users')}
                sx={{ mr: 2 }}
              >
                Voltar
              </Button>
              <Typography variant="h4" component="h1">
                Editar Usuário
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nome"
                value={formData.name}
                onChange={handleChange('name')}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={formData.type}
                  label="Tipo"
                  onChange={handleChange('type')}
                >
                  <MenuItem value="user">Usuário</MenuItem>
                  <MenuItem value="admin">Administrador</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                fullWidth
                label="Nova Senha (deixe em branco para manter a atual)"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  sx={{ minWidth: 120 }}
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/users')}
                  disabled={saving}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default EditUser;

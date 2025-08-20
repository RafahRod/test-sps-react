import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Alert,
  Box,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Add as AddIcon, History as HistoryIcon } from '@mui/icons-material';

import Header from '../components/Layout/Header';
import UsersTable from '../components/Table/UsersTable';
import HistoryTable from '../components/Table/HistoryTable';
import UserForm from '../components/Forms/UserForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import { useUsers } from '../hooks/useUsers';
import { useLogs } from '../hooks/useLogs';
import { useAuth } from '../contexts/AuthContext';

function Users() {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  
  const { user } = useAuth();
  const isAdmin = user?.type === 'admin';
  
  const { logs, loading: logsLoading, error: logsError, fetchLogs } = useLogs();
  
  const {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    clearError
  } = useUsers();

  const handleOpenForm = () => {
    setOpenForm(true);
    clearError();
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingUser(null);
    clearError();
  };

  const handleCreateUser = async (userData) => {
    const result = await createUser(userData);
    if (result.success) {
      handleCloseForm();
      if (isAdmin) {
        fetchLogs();
      }
    }
  };

  const handleEditUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setEditingUser(user);
    setOpenForm(true);
    clearError();
  };

  const handleUpdateUser = async (userData) => {
    const result = await updateUser(editingUser.id, userData);
    if (result.success) {
      handleCloseForm();
      if (isAdmin) {
        fetchLogs();
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const result = await deleteUser(userId);
      if (result.success && isAdmin) {
        fetchLogs();
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <>
        <Header title="Gerenciamento de Usuários" />
        <Container>
          <LoadingSpinner message="Carregando usuários..." />
        </Container>
      </>
    );
  }

  return (
    <>
      <Header title="Gerenciamento de Usuários" />
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
          >
            Novo Usuário
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isAdmin && (
          <Paper sx={{ mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Usuários" />
              <Tab 
                label="Histórico" 
                icon={<HistoryIcon />} 
                iconPosition="start"
              />
            </Tabs>
          </Paper>
        )}

        {!isAdmin || activeTab === 0 ? (
          <UsersTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ) : (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Histórico de Operações ({logs.length} registros)
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={fetchLogs}
                disabled={logsLoading}
              >
                {logsLoading ? 'Carregando...' : 'Atualizar'}
              </Button>
            </Box>

            {logsError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {logsError}
              </Alert>
            )}

            {logsLoading ? (
              <LoadingSpinner message="Carregando histórico..." />
            ) : (
              <HistoryTable logs={logs} />
            )}
          </Box>
        )}

        <UserForm
          open={openForm}
          onClose={handleCloseForm}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          user={editingUser}
          title={editingUser ? "Editar Usuário" : "Novo Usuário"}
          submitText={editingUser ? "Atualizar" : "Criar"}
        />
      </Container>
    </>
  );
}

export default Users;

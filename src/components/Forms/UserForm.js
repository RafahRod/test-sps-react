import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';

const UserForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  user, 
  title = "Usuário",
  submitText = "Salvar"
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    type: 'user',
    password: ''
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        type: user.type || 'user',
        password: ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        type: 'user',
        password: ''
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange('name')}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange('email')}
            required
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
            margin="dense"
            label={user ? "Nova Senha (deixe em branco para manter)" : "Senha"}
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange('password')}
            required={!user}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {submitText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;

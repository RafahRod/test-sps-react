import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box
} from '@mui/material';

const HistoryTable = ({ logs = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const getOperationColor = (operation) => {
    switch (operation) {
      case 'CREATE':
        return 'success';
      case 'UPDATE':
        return 'warning';
      case 'DELETE':
        return 'error';
      default:
        return 'default';
    }
  };

  const translateOperation = (operation) => {
    switch (operation) {
      case 'CREATE':
        return 'Criado';
      case 'UPDATE':
        return 'Atualizado';
      case 'DELETE':
        return 'Excluído';
      default:
        return operation;
    }
  };

  if (logs.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Nenhum histórico encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data/Hora</TableCell>
            <TableCell>Operação</TableCell>
            <TableCell>Usuário Afetado</TableCell>
            <TableCell>Campo Alterado</TableCell>
            <TableCell>Valor Anterior</TableCell>
            <TableCell>Valor Novo</TableCell>
            <TableCell>Executado Por</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow key={index} hover>
              <TableCell>{formatDate(log.timestamp)}</TableCell>
              <TableCell>
                <Chip 
                  label={translateOperation(log.operation)} 
                  color={getOperationColor(log.operation)}
                  size="small"
                />
              </TableCell>
              <TableCell>{log.user_name || log.userName || '-'}</TableCell>
              <TableCell>{log.field_changed || log.fieldChanged || '-'}</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {log.old_value || log.oldValue || '-'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {log.new_value || log.newValue || '-'}
                </Typography>
              </TableCell>
              <TableCell>{log.executed_by_name || log.executedByName || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;

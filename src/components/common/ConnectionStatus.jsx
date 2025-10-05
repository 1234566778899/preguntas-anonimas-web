'use client';

import React from 'react';
import { Alert, AlertTitle, Box, LinearProgress } from '@mui/material';
import { WifiOff, Wifi } from '@mui/icons-material';
import { useSocketContext } from '@/context/SocketContext';

export const ConnectionStatus = () => {
  const { isConnected, connectionError } = useSocketContext();

  // No mostrar nada si está conectado
  if (isConnected && !connectionError) {
    return null;
  }

  // Mostrando estado de conexión
  if (!isConnected && !connectionError) {
    return (
      <Box sx={{ position: 'fixed', top: 70, left: 0, right: 0, zIndex: 1300 }}>
        <Alert
          severity="info"
          icon={<Wifi />}
          sx={{
            borderRadius: 0,
            justifyContent: 'center',
          }}
        >
          <AlertTitle>Conectando al servidor...</AlertTitle>
          <LinearProgress sx={{ mt: 1 }} />
        </Alert>
      </Box>
    );
  }

  // Mostrar error de conexión
  if (connectionError) {
    return (
      <Box sx={{ position: 'fixed', top: 70, left: 0, right: 0, zIndex: 1300 }}>
        <Alert
          severity="error"
          icon={<WifiOff />}
          sx={{
            borderRadius: 0,
            justifyContent: 'center',
          }}
        >
          <AlertTitle>Error de conexión</AlertTitle>
          No se puede conectar al servidor. Reintentando...
        </Alert>
      </Box>
    );
  }

  return null;
};
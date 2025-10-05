'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initSocket, getSocket, disconnectSocket } from '@/lib/socket';
import { showErrorToast } from '@/utils/toast';
import { SOCKET_EVENTS } from '@/utils/constants';


const SocketContext = createContext(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext debe ser usado dentro de SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const socketInstance = initSocket();
    setSocket(socketInstance);

    // Eventos de conexión
    socketInstance.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('✅ Socket conectado:', socketInstance.id);
      setIsConnected(true);
      setConnectionError(null);
    });

    socketInstance.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log('❌ Socket desconectado:', reason);
      setIsConnected(false);

      if (reason === 'io server disconnect') {
        // El servidor desconectó el socket, reconectar manualmente
        socketInstance.connect();
      }
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
      setConnectionError(error.message);
      showErrorToast('Error al conectar con el servidor');
    });

    // Conectar automáticamente
    socketInstance.connect();

    // Cleanup
    return () => {
      if (socketInstance) {
        socketInstance.off(SOCKET_EVENTS.CONNECT);
        socketInstance.off(SOCKET_EVENTS.DISCONNECT);
        socketInstance.off('connect_error');
        disconnectSocket();
      }
    };
  }, []);

  const value = {
    socket,
    isConnected,
    connectionError,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
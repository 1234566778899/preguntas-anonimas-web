'use client';

import { useEffect, useCallback } from 'react';
import { useSocketContext } from '@/context/SocketContext';

/**
 * Hook personalizado para manejar eventos de Socket.io
 * @param {string} eventName - Nombre del evento
 * @param {function} handler - Función manejadora del evento
 */
export const useSocket = (eventName, handler) => {
  const { socket, isConnected } = useSocketContext();

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, isConnected, eventName, handler]);
};

/**
 * Hook para emitir eventos de Socket.io
 */
export const useSocketEmit = () => {
  const { socket, isConnected } = useSocketContext();

  const emit = useCallback((eventName, data) => {
    if (socket && isConnected) {
      socket.emit(eventName, data);
      return true;
    }
    console.warn('Socket no está conectado');
    return false;
  }, [socket, isConnected]);

  return { emit, isConnected };
};

/**
 * Hook para manejar múltiples eventos de Socket.io
 * @param {object} events - Objeto con eventos y sus handlers
 * Ejemplo: { 'evento1': handler1, 'evento2': handler2 }
 */
export const useSocketEvents = (events) => {
  const { socket, isConnected } = useSocketContext();

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Registrar todos los eventos
    Object.entries(events).forEach(([eventName, handler]) => {
      socket.on(eventName, handler);
    });

    // Cleanup: Eliminar todos los eventos
    return () => {
      Object.entries(events).forEach(([eventName, handler]) => {
        socket.off(eventName, handler);
      });
    };
  }, [socket, isConnected, events]);
};

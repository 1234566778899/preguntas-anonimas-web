import { io } from 'socket.io-client';
import { APP_CONFIG } from '@/utils/constants';

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(APP_CONFIG.SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
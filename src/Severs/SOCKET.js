import io from 'socket.io-client';

const socket = io('http://172.16.26.75:3000');
export const SOCKET = {
  IO: socket,
};

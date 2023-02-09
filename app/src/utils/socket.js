import { io } from 'socket.io-client';
export const socket = io.connect('http://192.168.28.62:4000');
export const connectSocket = () => io.connect('http://192.168.28.62:4000');

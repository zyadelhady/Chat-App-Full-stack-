import io from 'socket.io-client';
export const socket = io.connect(
  'https://real-time-chat-web-application.herokuapp.com'
);

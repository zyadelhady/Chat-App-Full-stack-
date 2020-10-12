import io from 'socket.io-client';

export const socket = io.connect(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://real-time-chat-web-application.herokuapp.com'
);

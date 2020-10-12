import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/'
      : 'https://real-time-chat-web-application.herokuapp.com/',
  withCredentials: true,
});

export default instance;

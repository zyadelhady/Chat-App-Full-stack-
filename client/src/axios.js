import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://real-time-chat-web-application.herokuapp.com/',
  withCredentials: true,
});

export default instance;

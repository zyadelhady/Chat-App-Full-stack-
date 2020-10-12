import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://real-time-chat-web-application.herokuapp.com/',
//   withCredentials: true,
// });

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true,
});

export default instance;

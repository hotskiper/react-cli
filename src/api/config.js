import axios from 'axios';

export const config = {
  serverAddr: 'http://10.0.200.45:8080/zero'
};

const service = axios.create({
  baseURL: `${config.serverAddr}`,
  withCredentials: false,
  timeout: 300000
});

export default service;

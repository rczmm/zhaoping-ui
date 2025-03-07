import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 15000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 此处可配置token等请求头信息
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 统一错误处理逻辑
    return Promise.reject(error);
  }
);

export default service;
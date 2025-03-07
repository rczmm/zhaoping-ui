import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 15000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 获取token并添加到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code && response.data.code !== 200) {
      return Promise.reject(new Error(response.data.message || '请求失败'));
    }
    return response.data;
  },
  error => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

export default service;
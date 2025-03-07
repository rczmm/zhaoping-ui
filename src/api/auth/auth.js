import service from '../axios';

/**
 * 用户认证相关接口
 */
export default {
  // 用户注册
  register(data) {
    return service({
      url: '/auth/register',
      method: 'post',
      data
    });
  },

  // 用户登录
  login(credentials) {
    return service({
      url: '/auth/login',
      method: 'post',
      data: credentials
    });
  },

  // 获取用户信息
  getProfile() {
    return service({
      url: '/auth/profile',
      method: 'get'
    });
  }
};
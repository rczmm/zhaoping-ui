import service from '../axios';

export default {
  // 获取候选人列表
  getList(params) {
    return service({
      url: '/candidate/list',
      method: 'get',
      params
    });
  },

  // 创建候选人
  create(data) {
    return service({
      url: '/candidate/create',
      method: 'post',
      data
    });
  },

  // 更新候选人信息
  update(id, data) {
    return service({
      url: `/candidate/update/${id}`,
      method: 'put',
      data
    });
  }
};
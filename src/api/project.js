import axios from './config';

/**
 * 查询项目
 * @param {String}} data
 */
export const searchProjectApi = data => {
  const params = data ? data : '';
  return axios.get(`/api/v1/zero/projectinfo/list?${params}`);
};
/**
 * 获取项目数据
 */
export const getProjectListApi = () =>
  axios.get('/api/v1/zero/projectinfo/list');

/**
 * 嗅探数据库
 * @param {String}} data
 */
export const getDataBaseListApi = data =>
  axios.get(
    `/api/v1/zero/datasource/datasourceNames?ip=${data.ip}&password=${data.password}&username=${data.username}`
  );

/**
 * 创建项目
 * @param {String}} data
 */
export const createProjectApi = data =>
  axios({
    url: '/api/v1/zero/projectinfo',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  });

/**
 * 修改项目
 * @param {String}} data
 */
export const editProjectApi = data =>
  axios({
    url: '/api/v1/zero/projectinfo',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    data
  });

/**
 * 删除项目
 * @param {String}} data
 */
export const deleteProjectApi = id =>
  axios({
    url: `/api/v1/zero/projectinfo/one/${id}`,
    method: 'delete'
  });

/**
 * 检查数据源连接
 * @param {String}} data
 */
export const checkResourceConnectApi = data =>
  axios({
    url: '/api/v1/zero/datasource/detect',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  });

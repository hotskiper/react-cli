import config from '../config';
import axios from 'axios';

axios.defaults.baseURL = `${config.serverAddr}/api/v1/zero/`;

/**
 * 获取数据源列表
 * @param {String}} id 项目ID
 */
// export const getSourceListApi = id => axios.get('/json/sourceList.json');
export const getSourceListApi = id => axios.get('datasource/list', { params: { projectId: id } });

/**
 * 获取数据库列表
 * @param {Object}} params 数据源参数
 */
export const getDataSourceNamesApi = params => axios.get('datasource/datasourceNames', { params: params });

/**
 * 添加数据源
 * @param {Object}} params 数据源参数
 */
export const setDataSourceApi = params => axios.post('datasource', params);

/**
 * 检测数据源是否可以连通
 * @param {Object}} params 数据源参数
 */
export const getDataSourceDetectApi = params => axios.post('datasource/detect', params);

/**
 * 获取生成实体任务的状态
 * @param {String}} id 任务ID
 */
// export const getTaskStateApi = id => axios.get('/json/task.json');
export const getTaskStateApi = id => axios.get('/taskinfo/' + id);

/**
 * 重跑任务
 * @param {String}} id 任务ID
 */
export const runTaskByIdApi = id => axios.get('/taskinfo/rerun?id=' + id);

/**
 * 获取实体列表
 * @param {String}} id 数据源ID
 */
// export const getPrototypeListApi = id => axios.get('/json/prototypeList.json');
export const getPrototypeListApi = id => axios.get('/instanceinfo/list?datasourceId=' + id);

/**
 * 获取页面列表
 * @param {String}} id 数据源ID
 */
export const getPageListApi = id => axios.get('pageinfo/list?datasourceId=' + id);

/**
 * 保存页面选中态
 * @param {Object}} params 数据源参数
 */
export const setPageStatusApi = params => axios.get('pageinfo/batchselect', { params: params });

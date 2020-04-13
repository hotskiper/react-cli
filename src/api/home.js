import axios from 'axios';
import config from '../config';
/**
 * 获取组件数据
 * @param {String}} id 页面ID
 */
export const getComponentsApi = id => axios.get('/json/components.json');

/**
 * 获取模型实体数据
 * @param {String}} id 页面ID
 */
export const getModelsApi = id => axios.get('/json/models.json');

/**
 * 获取项目信息
 * @param {String}} id 页面ID
 */
export const getProjectApi = id => axios.get(`${config.serverAddr}/api/v1/zero/projectinfo/${id}`);

/**
 * 更新项目状态
 * @param {String}} id 页面ID
 */
export const updateProjectApi = params => axios.put(`${config.serverAddr}/api/v1/zero/projectinfo`, params);

/**
 * 获取页面列表
 * @param {String}} id 页面ID
 */
export const getPageListApi = params => axios.get(`${config.serverAddr}/api/v1/zero/pageinfo/list`, { params });

/**
 * 获取页面字段
 * @param {String}} id 页面ID
 */
export const getPageInfoFieldsApi = id => axios.get(`${config.serverAddr}/api/v1/zero/pageinfo/${id}`);

/**
 * 获取页面数据
 * @param {String}} params 页面
 */
export const getPageInfoDataApi = params => axios.get(`${config.serverAddr}/api/v1/zero/pageData/list`, { params });

/**
 * 获取页面数据详情
 * @param {String}} params 页面
 */
export const getPageInfoDataDetailApi = params => axios.get(`${config.serverAddr}/api/v1/zero/pageData/detail`, { params });

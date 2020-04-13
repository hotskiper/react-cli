import * as actionType from './actionTypes';
export const fetchComsData = (id, fn) => ({
  type: 'COMS_FETCH_REQUESTED',
  payload: {
    id,
    fn
  }
})

export const fetchModelData = (id, fn) => ({
  type: 'MODELS_FETCH_REQUESTED',
  payload: {
    id,
    fn
  }
})
/**
 * 新增实例
 */
let instanceId = 0;
export const addComInstance = instance => ({
  type: 'ADD_COM_INSTANCE',
  id: instanceId++,
  instance
})

/**
 * 保存实体模型
 * @param {Array} models 实体模型
 */
export const saveModelData = models => ({
  type: 'SAVE_MODEL_LIST',
  id: instanceId++,
  data: models.data
})

/**
 * 获取项目
 */
export const getProject = (data, fn) => ({
  type: actionType.GET_PROJECT,
  payload: {
    data,
    fn
  }
})

/**
 * 更新项目
 */
export const updateProject = (data, fn) => ({
  type: actionType.UPDATE_PROJECT,
  payload: {
    data,
    fn
  }
})

/**
 * 获取页面
 */
export const getHomePageInfo = (data, fn) => ({
  type: actionType.GET_HOME_PAGEINFO,
  payload: {
    data,
    fn
  }
})

/**
 * 当前选择页面
 */
export const setSelectedPageId = (id, fn) => ({
  type: actionType.SET_SELECTED_PAGEID,
  payload: {
    id,
    fn
  }
})

/**
 * 当前页面选择组件
 */
export const setSelectedComId = (ids, fn) => ({
  type: actionType.SET_SELECTED_COMIDS,
  payload: {
    ids,
    fn
  }
})

/**
 * 获取页面字段
 */
export const getPageInfoFields = (id, fn) => ({
  type: actionType.GET_PAGEINFO_FIELDS,
  payload: {
    id,
    fn
  }
})

/**
 * 获取页面数据
 */
export const getPageInfoData = (params, fn) => ({
  type: actionType.GET_PAGEINFO_DATA,
  payload: {
    params,
    fn
  }
})

/**
 * 获取页面数据详情
 */
export const getPageInfoDataDetail = (params, fn) => ({
  type: actionType.GET_PAGEINFO_DATA_DETAIL,
  payload: {
    params,
    fn
  }
})

/**
 * 保存页面配置
 */
export const setPageConfig = (data, fn) => ({
  type: actionType.SET_PAGE_CONFIG,
  payload: {
    data,
    fn
  }
})

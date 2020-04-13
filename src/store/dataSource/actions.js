import * as actionType from './actionTypes';
// 获取数据源列表
export const getSourceList = (id, fn) => ({
  type: actionType.GET_SOURCE_LIST,
  payload: {
    id,
    fn
  }
});

// 获取数据库名称
export const getDataSourceNames = (opt, fn) => ({
  type: actionType.GET_SOURCE_NAME,
  payload: {
    opt,
    fn
  }
});

// 添加数据源
export const addDataSource = (opt, fn) => ({
  type: actionType.SAVE_SOURCE_INFO,
  payload: {
    opt,
    fn
  }
});

// 检测数据源是否可以连通
export const getDataSourceDetect = (opt, fn) => ({
  type: actionType.GET_SOURCE_DETECT,
  payload: {
    opt,
    fn
  }
});

// 获取生成实体任务的状态
export const getTaskState = (id, fn) => ({
  type: actionType.GET_TASK_STATE,
  payload: {
    id,
    fn
  }
});

// 重跑任务
export const setRunTask = (id, fn) => ({
  type: actionType.SET_RUN_TASK,
  payload: {
    id,
    fn
  }
});

// 获取实体
export const getEntityRelation = (id, fn) => ({
  type: actionType.GET_ENTITY_RELATION,
  payload: {
    id,
    fn
  }
});

// 获取页面信息
export const getPageList = (id, fn) => ({
  type: actionType.GET_PAGE_LIST,
  payload: {
    id,
    fn
  }
});

// 保存页面选中状态
export const setPageStatus = (opt, fn) => ({
  type: actionType.SAVE_PAGE_STATUS,
  payload: {
    opt,
    fn
  }
});





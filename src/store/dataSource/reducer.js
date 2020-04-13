import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

// 获取数据源列表
const resolveSourceGetList = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_SOURCE_GET_LIST:
      return action.payload.data;
    default:
      return state;
  }
};

// 请求数据源数据
const resolveDataSourceNames = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_SOURCE_NAME:
      return action.payload.data;
    default:
      return state;
  }
};

// 添加数据源数据
const resolveAddDataSource = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_SAVE_SOURCE_INFO:
      return action.payload.data;
    default:
      return state;
  }
};

// 检测数据源是否可以连通
const resolveDataSourceDetect = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_SOURCE_DETECT:
      return action.payload.data;
    default:
      return state;
  }
};

// 获取生成实体任务状态
const resolveTaskState = (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_TASK_STATE:
      return action.payload.data;
    default:
      return state;
  }
};

// 获取生成实体任务状态
const resolveRunTask = (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_RUN_TASK:
      return action.payload.data;
    default:
      return state;
  }
};

// 获取实体数据
const resolveEntityRelation = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_ENTITY_RELATION:
      return action.payload.data;
    default:
      return state;
  }
};

// 获取页面信息
const resolvePageList = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_PAGE_LIST:
      return action.payload.data;
    default:
      return state;
  }
};

// 保存页面选中状态
const resolveSavePageStatus = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_PAGE_STATUS:
      return action.payload.data;
    default:
      return state;
  }
};

export default combineReducers({
  sourceList: resolveSourceGetList,
  entityRelation: resolveEntityRelation,
  taskState: resolveTaskState,
  pageList: resolvePageList,
  dataSourceNames: resolveDataSourceNames,
  addDataSource: resolveAddDataSource,
  dataSourceDetect: resolveDataSourceDetect,
  savePageStatus: resolveSavePageStatus,
  runTask: resolveRunTask,
});

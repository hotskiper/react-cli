import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

// 获取大屏列表
const resolveProjectGetList = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_PROJECT_GET_LIST:
      return action.payload.data;
    default:
      return state;
  }
};

// 筛选结果列表
const resolveSearchResultList = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_SEARCH_PROJECTS:
      return action.payload.data;
    default:
      return state;
  }
};

// 获取数据库列表
const resolveDataBaseList = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.RESOLVE_DATABASE_LIST:
      return action.payload.data;
    default:
      return state;
  }
};

export default combineReducers({
  projectList: resolveProjectGetList,
  dataBaseList: resolveDataBaseList,
  filterResult: resolveSearchResultList
});

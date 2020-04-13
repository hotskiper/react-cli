
import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
const comInstance = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COM_INSTANCE':
      return [
        ...state,
        {
          id: action.id,
          com: action.instance
        }
      ]
    default:
      return state;
  }
}

const saveComsList = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_COMPONENTS_LIST':
      return action.data;
    default:
      return state;
  }
}

const saveModelList = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_MODEL_LIST':
      return action.data;
    default:
      return state;
  }
}

/**
 * 保存当前选择页面ID
 * @param {*} state 
 * @param {*} action 
 */
const saveProject = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.RESOLVE_GET_PROJECT:
      return action.data;
    default:
      return state;
  }
}

/**
 * 保存当前选择页面ID
 * @param {*} state 
 * @param {*} action 
 */
const savePageInfo = (state = [], action) => {
  switch (action.type) {
    case actionTypes.RESOLVE_GET_HOME_PAGEINFO:
      return action.data;
    default:
      return state;
  }
}

/**
 * 保存当前选择页面ID
 * @param {*} state 
 * @param {*} action 
 */
const resolveSelectedPageId = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_PAGEID:
      return action.payload.id;
    default:
      return state;
  }
}

/**
 * 保存当前页面选择组件ID
 * @param {*} state 
 * @param {*} action 
 */
const resolveSelectedComIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_COMIDS:
      const { ids, flag } = action.payload;
      if (flag === 1) {
        return state.concat(ids.filter(m => state.indexOf(m) === -1));
      }
      return ids;
    default:
      return state;
  }
}

/**
 * 保存页面配置
 * @param {*} state 
 * @param {*} action 
 */
const resolvePageInfoConfig = (state = null, action) => {
  switch (action.type) {
    case actionTypes.RESOLVE_GET_PAGEINFO_CONFIG:
      return action.payload.data;
    default:
      return state;
  }
}

/**
 * 保存页面字段
 * @param {*} state 
 * @param {*} action 
 */
const resolvePageInfoFields = (state = [], action) => {
  switch (action.type) {
    case actionTypes.RESOLVE_GET_PAGEINFO_FIELDS:
      return action.payload.data;
    default:
      return state;
  }
}

/**
 * 保存页面数据
 * @param {*} state 
 * @param {*} action 
 */
const resolvePageInfoData = (state = [], action) => {
  switch (action.type) {
    case actionTypes.RESOLVE_GET_PAGEINFO_DATA:
      return action.payload.data;
    default:
      return state;
  }
}

/**
 * 保存页面数据详情
 * @param {*} state 
 * @param {*} action 
 */
const resolvePageInfoDataDetail = (state = null, action) => {
  switch (action.type) {
    case actionTypes.RESOLVE_GET_PAGEINFO_DATA_DETAIL:
      return action.payload.data;
    default:
      return state;
  }
}

/**
 * 保存页面配置
 * @param {*} state 
 * @param {*} action 
 */
const resolvePageConfig = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE_CONFIG:
      return action.payload.data;
    default:
      return state;
  }
}

export default combineReducers({
  instance: comInstance,
  components: saveComsList,
  models: saveModelList,
  project: saveProject,
  pageList: savePageInfo,
  selectedPageId: resolveSelectedPageId,
  pageInfoConfig: resolvePageInfoConfig,
  pageInfoFields: resolvePageInfoFields,
  pageInfoData: resolvePageInfoData,
  pageInfoDataDetail: resolvePageInfoDataDetail,
  pageConfig: resolvePageConfig,
  selectedComIds: resolveSelectedComIds
})
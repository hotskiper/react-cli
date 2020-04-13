import { call, put, take, takeEvery } from 'redux-saga/effects'
import {
  getModelsApi,
  getComponentsApi,
  getProjectApi,
  updateProjectApi,
  getPageListApi,
  getPageInfoFieldsApi,
  getPageInfoDataApi,
  getPageInfoDataDetailApi
} from '../../api/home';
import * as actionTypes from './actionTypes';

/**
 * 请求组件数据
 * @param {*} action 
 */
export function* fetchComponents(action) {
  try {
    const res = yield call(getComponentsApi, action.payload.id);
    yield put({ type: "SAVE_COMPONENTS_LIST", data: res.data.data });
    action.payload.fn && action.payload.fn();
  } catch (e) {
    yield put({ type: "COMPONENTS_FETCH_FAILED", message: e.message });
  }
}

/**
 * 请求模型数据
 * @param {*} action 
 */
export function* fetchModels(action) {
  try {
    const res = yield call(getModelsApi, action.payload.id);
    yield put({ type: "SAVE_MODEL_LIST", data: res.data.data });
    action.payload.fn && action.payload.fn();
  } catch (e) {
    yield put({ type: "MODELS_FETCH_FAILED", message: e.message });
  }
}

/**
 * 获取项目信息
 * @param {String} id 项目id 
 */
export function* getProject(action) {
  try {
    const res = yield call(getProjectApi, action.payload.data);
    if (res.data.code === 0) {
      yield put({ type: actionTypes.RESOLVE_GET_PROJECT, data: res.data.data || {} });
      action.payload.fn && action.payload.fn(res.data.data);
    }
  } catch (e) {
    yield put({ type: "PROJECT_GET_FAILED", message: e.message });
  }
}

/**
 * 获取项目信息
 * @param {String} id 项目id 
 */
export function* updateProject(action) {
  try {
    const res = yield call(updateProjectApi, action.payload.data);
    if (res.data.code === 0) {
      action.payload.fn && action.payload.fn();
    }
  } catch (e) {
    yield put({ type: "PROJECT_GET_FAILED", message: e.message });
  }
}

/**
 * 获取项目页面
 * @param {String} id 项目id 
 */
export function* getPageInfo(action) {
  try {
    const res = yield call(getPageListApi, action.payload.data);
    if (res.data.code === 0) {
      yield put({ type: actionTypes.RESOLVE_GET_HOME_PAGEINFO, data: res.data.data });
      action.payload.fn && action.payload.fn(res.data.data);
    }
  } catch (e) {
    yield put({ type: "HOME_PAGEINFO_GET_FAILED", message: e.message });
  }
}

/**
 * 获取当前页面字段
 * @param {String} id 项目id 
 */
export function* getPageInfoFields(action) {
  try {
    const res = yield call(getPageInfoFieldsApi, action.payload.id);
    yield put({
      type: actionTypes.RESOLVE_GET_PAGEINFO_FIELDS, payload: {
        data: res.data.data.fieldInfos
      }
    });
    yield put({
      type: actionTypes.RESOLVE_GET_PAGEINFO_CONFIG, payload: {
        data: res.data.data.pageInfo
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: "ACTIVE_PAGE_GET_FAILED", message: e.message });
  }
}

/**
 * 获取当前页面数据
 * @param {String} id 项目id 
 */
export function* getPageInfoData(action) {
  try {
    const { params, fn } = action.payload;
    const _params = {
      pageId: params.id,
      keyword: params.keyword,
      pageItems: params.pageSize,
      pageNo: params.current,
      totalRows: params.total,
      sortname: params.sortname,
      sortorder: params.sortorder
    }
    const res = yield call(getPageInfoDataApi, _params);
    yield put({
      type: actionTypes.RESOLVE_GET_PAGEINFO_DATA, payload: {
        data: res.data
      }
    });
    fn && fn();
  } catch (e) {
    yield put({ type: "PAGEINFO_DATA_GET_FAILED", message: e.message });
  }
}

/**
 * 获取页面数据详情
 * @param {String} id 项目id 
 */
export function* getPageInfoDataDetail(action) {
  try {
    const { params, fn } = action.payload;
    const _params = {
      pageId: params.id,
      ctid: params.ctid
    }
    const res = yield call(getPageInfoDataDetailApi, _params);
    yield put({
      type: actionTypes.RESOLVE_GET_PAGEINFO_DATA_DETAIL, payload: {
        data: res.data.data
      }
    });
    fn && fn();
  } catch (e) {
    yield put({ type: "PAGEINFO_DATA_DETAIL_GET_FAILED", message: e.message });
  }
}

export function* componentsSagaFlow() {
  yield takeEvery("COMS_FETCH_REQUESTED", fetchComponents);
}

export function* modelsSagaFlow() {
  yield takeEvery("MODELS_FETCH_REQUESTED", fetchModels);
}

export function* getProjectSagaFlow() {
  yield takeEvery("GET_PROJECT", getProject);
}

export function* updateProjectSagaFlow() {
  yield takeEvery("UPDATE_PROJECT", updateProject);
}

export function* pageInfoSagaFlow() {
  yield takeEvery("GET_HOME_PAGEINFO", getPageInfo);
}

export function* pageInfoFieldsSagaFlow() {
  yield takeEvery("GET_PAGEINFO_FIELDS", getPageInfoFields);
}

export function* pageInfoDataSagaFlow() {
  yield takeEvery("GET_PAGEINFO_DATA", getPageInfoData);
}

export function* pageInfoDataDetailSagaFlow() {
  yield takeEvery("GET_PAGEINFO_DATA_DETAIL", getPageInfoDataDetail);
}

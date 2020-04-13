import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getSourceListApi,
  getDataSourceDetectApi,
  getTaskStateApi,
  getPrototypeListApi,
  getPageListApi,
  getDataSourceNamesApi,
  setDataSourceApi,
  setPageStatusApi,
  runTaskByIdApi
} from '../../api/dataSource';
import * as actionTypes from './actionTypes';

/**
 * 请求数据源数据
 * @param {*} action
 */
export function* getSourceList(action) {
  try {
    const res = yield call(getSourceListApi, action.payload.id);
    yield put({
      type: actionTypes.RESOLVE_SOURCE_GET_LIST,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 请求数据源数据
 * @param {*} action
 */
export function* getDataSourceNames(action) {
  try {
    const res = yield call(getDataSourceNamesApi, action.payload.opt);
    yield put({
      type: actionTypes.RESOLVE_SOURCE_NAME,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 添加数据源
 * @param {*} action
 */
export function* addDataSource(action) {
  try {
    const res = yield call(setDataSourceApi, action.payload.opt);
    yield put({
      type: actionTypes.RESOLVE_SAVE_SOURCE_INFO,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 检测数据源是否可以连通
 * @param {*} action
 */
export function* getDataSourceDetect(action) {
  try {
    const res = yield call(getDataSourceDetectApi, action.payload.opt);
    yield put({
      type: actionTypes.RESOLVE_SOURCE_DETECT,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 请求数据源数据
 * @param {*} action
 */
export function* getTaskState(action) {
  try {
    const res = yield call(getTaskStateApi, action.payload.id);
    yield put({
      type: actionTypes.RESOLVE_TASK_STATE,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 重跑任务
 * @param {*} action
 */
export function* setRunTask(action) {
  try {
    const res = yield call(runTaskByIdApi, action.payload.id);
    yield put({
      type: actionTypes.RESOLVE_RUN_TASK,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 请求实体数据
 * @param {*} action
 */
export function* getEntityRelation(action) {
  try {
    const res = yield call(getPrototypeListApi, action.payload.id);
    yield put({
      type: actionTypes.RESOLVE_ENTITY_RELATION,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 请求页面列表
 * @param {*} action
 */
export function* getPageList(action) {
  try {
    const res = yield call(getPageListApi, action.payload.id);
    yield put({
      type: actionTypes.RESOLVE_PAGE_LIST,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

/**
 * 保存页面选中状态
 * @param {*} action
 */
export function* setPageStatus(action) {
  try {
    const res = yield call(setPageStatusApi, action.payload.opt);
    yield put({
      type: actionTypes.RESOLVE_PAGE_STATUS,
      payload: {
        data: res.data.data
      }
    });
    action.payload.fn && action.payload.fn(res.data.data);
  } catch (e) {
    yield put({ type: 'SOURCE_GET_FAILED', message: e.message });
  }
}

export function* sourceSagaFlow() {
  yield takeEvery(actionTypes.GET_SOURCE_LIST, getSourceList);
}

export function* dataSourceNamesSagaFlow() {
  yield takeEvery(actionTypes.GET_SOURCE_NAME, getDataSourceNames);
}

export function* addDataSourceSagaFlow() {
  yield takeEvery(actionTypes.SAVE_SOURCE_INFO, addDataSource);
}

export function* dataSourceDetectSagaFlow() {
  yield takeEvery(actionTypes.GET_SOURCE_DETECT, getDataSourceDetect);
}

export function* taskStateSagaFlow() {
  yield takeEvery(actionTypes.GET_TASK_STATE, getTaskState);
}

export function* runTaskFlow() {
  yield takeEvery(actionTypes.SET_RUN_TASK, setRunTask);
}

export function* entityRelationSagaFlow() {
  yield takeEvery(actionTypes.GET_ENTITY_RELATION, getEntityRelation);
}

export function* pageListSagaFlow() {
  yield takeEvery(actionTypes.GET_PAGE_LIST, getPageList);
}

export function* savePageStatusSagaFlow() {
  yield takeEvery(actionTypes.SAVE_PAGE_STATUS, setPageStatus);
}

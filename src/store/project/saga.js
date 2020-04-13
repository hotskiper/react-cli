import { call, put, take, select } from 'redux-saga/effects';
import {
  getProjectListApi,
  getDataBaseListApi,
  createProjectApi,
  editProjectApi,
  deleteProjectApi,
  searchProjectApi,
  checkResourceConnectApi
} from '../../api/project';
import * as actionTypes from './actionTypes';

/**
 * 请求组件数据
 */
export function* projectsSagaFlow() {
  while (true) {
    try {
      yield take(actionTypes.GET_PROJECT_LIST);
      const res = yield call(getProjectListApi);
      if (res.data.code === 0) {
        //按创建时间排序
        res.data.data.sort((a, b) => {
          return b.createTime - a.createTime;
        });
        yield put({
          type: actionTypes.RESOLVE_PROJECT_GET_LIST,
          payload: {
            data: res.data.data
          }
        });
      } else {
        //请求状态异常
        console.error(res.data);
      }
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

/**
 * 嗅探数据库
 */
export function* dataBaseSagaFlow() {
  while (true) {
    try {
      const data = yield take(actionTypes.GET_DATABASE_LIST);
      const res = yield call(getDataBaseListApi, data.data);
      if (res.data.code === 0) {
        yield put({
          type: actionTypes.RESOLVE_DATABASE_LIST,
          payload: {
            data: res.data.data
          }
        });
      }
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

/**
 * 创建项目
 */
export function* createProjectFlow() {
  while (true) {
    try {
      const data = yield take(actionTypes.POST_CREATE_PROJECT);
      const res = yield call(createProjectApi, JSON.stringify(data.data));
      if (res) {
        data.fn(res.data);
      }
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

/**
 * 检查数据源连接
 */
export function* checkResourceConnectFlow() {
  while (true) {
    try {
      const data = yield take(actionTypes.CHECK_RESOURCE_CONNECT);
      const res = yield call(
        checkResourceConnectApi,
        JSON.stringify(data.data)
      );
      if (res) {
        data.fn(res.data);
      }
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

/**
 * 修改项目
 */
export function* editProjectFlow() {
  while (true) {
    try {
      const data = yield take(actionTypes.PUT_EDIT_PROJECT);
      const res = yield call(editProjectApi, JSON.stringify(data.data));
      if (res) {
        data.fn(res.data);
      }
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

/**
 * 删除项目
 */
export function* deleteProjectFlow() {
  while (true) {
    try {
      const data = yield take(actionTypes.DELETE_PROJECT);
      console.log('data', data);
      const res = yield call(deleteProjectApi, data.id);
      console.log('res', res);
      if (res) {
        data.fn(res.data);
      }
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

/**
 *
 * 查询项目
 */
export function* searchProjectsFlow() {
  while (true) {
    try {
      const data = yield take(actionTypes.SEARCH_PROJECTS);
      //前端查询
      const projectList = yield select(state => state.project.projectList);
      const filterResult = projectList.filter(element => {
        return element.projectName.indexOf(data.data) > -1;
      });
      yield put({
        type: actionTypes.RESOLVE_SEARCH_PROJECTS,
        payload: {
          data: filterResult
        }
      });
      data.fn();
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

/**
 *
 * 校验重名
 */
export function* checkProjectsNameFlow() {
  while (true) {
    try {
      const data = yield take(actionTypes.CHECK_PROJECT_NAME);
      const res = yield call(searchProjectApi, data.data);
      if (res) {
        data.fn(res);
      }
    } catch (e) {
      yield put({ type: 'PROJECTS_FETCH_FAILED', message: e.message });
    }
  }
}

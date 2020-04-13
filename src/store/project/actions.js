import * as actionType from './actionTypes';
// 获取项目列表
export const getProjectList = () => ({
  type: actionType.GET_PROJECT_LIST,
  payload: {}
});

// 嗅探数据库列表
export const getDataBaseList = data => ({
  type: actionType.GET_DATABASE_LIST,
  data
});

// 新建项目
export const createProject = (data, fn) => ({
  type: actionType.POST_CREATE_PROJECT,
  data,
  fn
});

// 修改项目
export const editProject = (data, fn) => ({
  type: actionType.PUT_EDIT_PROJECT,
  data,
  fn
});

// 删除项目
export const deleteProject = (id, fn) => ({
  type: actionType.DELETE_PROJECT,
  id,
  fn
});

// 查询项目
export const searchProjects = (data, fn) => ({
  type: actionType.SEARCH_PROJECTS,
  data,
  fn
});

// 检测数据源是否连通
export const checkResourceConnect = (data, fn) => ({
  type: actionType.CHECK_RESOURCE_CONNECT,
  data,
  fn
});

// 校验项目名
export const checkProjectName = (data, fn) => ({
  type: actionType.CHECK_PROJECT_NAME,
  data,
  fn
});

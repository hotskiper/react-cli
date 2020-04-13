import { fork } from 'redux-saga/effects';
import * as home from './home/saga';
import * as project from './project/saga';
import * as dataSource from './dataSource/saga';

export default function* rootSaga() {
  // 编辑页
  yield fork(home.getProjectSagaFlow);
  yield fork(home.updateProjectSagaFlow);
  yield fork(home.componentsSagaFlow);
  yield fork(home.modelsSagaFlow);
  yield fork(home.pageInfoSagaFlow);
  yield fork(home.pageInfoFieldsSagaFlow);
  yield fork(home.pageInfoDataSagaFlow);
  yield fork(home.pageInfoDataDetailSagaFlow);
  // 项目管理页面
  yield fork(project.projectsSagaFlow);
  yield fork(project.dataBaseSagaFlow);
  yield fork(project.createProjectFlow);
  yield fork(project.editProjectFlow);
  yield fork(project.deleteProjectFlow);
  yield fork(project.searchProjectsFlow);
  yield fork(project.checkResourceConnectFlow);
  // 数据源管理
  yield fork(project.checkProjectsNameFlow);
  yield fork(dataSource.sourceSagaFlow);
  yield fork(dataSource.dataSourceNamesSagaFlow);
  yield fork(dataSource.addDataSourceSagaFlow);
  yield fork(dataSource.dataSourceDetectSagaFlow);
  yield fork(dataSource.taskStateSagaFlow);
  yield fork(dataSource.runTaskFlow);
  yield fork(dataSource.entityRelationSagaFlow);
  yield fork(dataSource.pageListSagaFlow);
  yield fork(dataSource.savePageStatusSagaFlow);
}
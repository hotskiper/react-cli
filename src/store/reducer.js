import { combineReducers } from 'redux';
import home from './home/reducer';
import project from './project/reducer';
import dataSource from './dataSource/reducer';

export default combineReducers({
  home,
  project,
  dataSource
})
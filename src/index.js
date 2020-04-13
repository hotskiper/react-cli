import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppWrap from './pages/wrap';
import store from './store';
import './index.css';
// import './fh-ui/css/fh-ui.css';

ReactDOM.render(
  <Provider store={store}>
    <AppWrap />
  </Provider>,
  document.getElementById('root')
);

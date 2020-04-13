import React, { lazy, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Project from '../project';
import Home from '../home';
import Release from '../release';
import DataSource from '../dataSource';
import Contents from '../release/contents';

const GlobalStyle = createGlobalStyle`
  .ace-scroll-bar {
    ::-webkit-scrollbar { width: 8px; height: 8px; background-color: transparent; }
    ::-webkit-scrollbar-track-piece { background-color: transparent; }
    ::-webkit-scrollbar-thumb { border-radius: 4px; background-color: rgba(45, 47, 51, 0.2); }
    ::-webkit-scrollbar-thumb:hover { background-color: rgba(45, 47, 51, 0.4); }
    ::-webkit-scrollbar-thumb:active { background-color: rgba(45, 47, 51, 0.4); }
    ::-webkit-scrollbar-track { background-color: transparent; }
    ::-webkit-scrollbar-corner { background-color: transparent; }
  }
`;

class WrapApp extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'ACE-智能构建平台';
  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Router>
          <Suspense>
            <Switch>
              <Route path="/project">
                <Project />
              </Route>
              <Route path="/home/:projectId" component={Home} />
              <Route path="/datasource/:projectId" component={DataSource} />
              <Route path="/preview/:projectId/:pageId" component={Release} />
              <Route path="/preview/:projectId" component={Release} />
              <Route path="/release/:projectId/:pageId" component={Release} />
              <Route path="/release/:projectId" component={Release} />
              <Route path="/contents/:projectId" component={Contents} />
              <Route path="/" component={Project} />
            </Switch>
          </Suspense>
        </Router>
      </React.Fragment>
    );
  }
}

export default WrapApp;

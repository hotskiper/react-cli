import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LeftPanel from './leftPanel/index';
import MainPanel from './mainPanel/index';
import RightPanel from './rightPanel/index';
import FilterCondition from '../../components/condition';
import Person from '../model/person';
import {
  getProject,
  getHomePageInfo
} from '../../store/home/actions.js';
import styled from 'styled-components';
import Search from '../../components/search';
const pageIcon = require('./images/ym.png');

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-size: 16px;
  height: 16px;
  line-height: 16px;
  font-weight: bold;
  padding: 0 6px;
  margin-bottom: 16px;
  border-left: solid 3px #2985f7;
`;

const PageList = styled.div`
  margin: 16px;
  padding: 16px;
  background-color: #fff;
`;

const PageItem = styled.div`
  height: 44px;
  line-height: 44px;
  padding: 0 12px;
  border-bottom: solid 1px #dfe4ed;
  i {
    display: inline-block;
    width: 10px;
    height: 12px;
    background-image: url(${pageIcon});
    background-repeat: no-repeat;
    position: relative;
    top: 1px;
    margin-right: 6px;
  }
  span {
    display: inline-block;
    width: 300px;
  }
  a {
    color: #2985f7;
  }
`;


class Home extends React.Component {
  constructor(props) {
    super(props);
    const { projectId } = this.props.match.params;
    this.projectId = projectId;
  }

  getChildContext() {
    return {
      projectId: this.projectId
    }
  }
  componentDidMount() {
    const params = {
      projectId: this.projectId,
      showFlag: 1
    }
    this.props.getProject(this.projectId);
    this.props.getHomePageInfo(params);
  }
  render() {
    const {
      project,
      pageList
    } = this.props;
    console.log('pageList', pageList);
    return (
      <Wrapper>
        <Search project={project} />
        <PageList>
          <Title>
            已构建页面
          </Title>
          {
            pageList.map(page => {
              const link = window.location.origin+'/release/'+this.projectId+'/'+page.id;
              return (
                <PageItem>
                  <i></i>
                  <span>{page.pageName}</span>
                  <a href={link} target="_blank">{link}</a>
                </PageItem>
              )
            })
          }
        </PageList>
      </Wrapper>
    )
  }
}

Home.childContextTypes = {
  projectId: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    pageList: state.home.pageList,
    project: state.home.project
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProject,
    getHomePageInfo
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

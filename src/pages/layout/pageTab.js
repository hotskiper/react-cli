import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button } from 'antd';
import {
  getProject,
  updateProject
} from '../../store/home/actions.js';
import config from '../../config';
import IconProject from './images/project.png';
import IconWfb from './images/wfb.png';
import IconYfb from './images/yfb.png';

const Wrapper = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #fff;
  box-shadow: 0 1px 16px 0 rgba(0,0,0,0.2);
  z-index: 999;
  position: relative;
`;

const PageName = styled.div`
  color: #000;
  display: inline-block;
  i {
    background-image: url(${IconProject});
    width: 15px;
    height: 15px;
    display: inline-block;
    position: relative;
    top: 2px;
    margin-right: 4px;
  }
  span {

  }
`;

const PageStatus = styled.div`
  color: #b4bccc;
  margin-left: 8px;
  display: inline-block;
  i {
    width: 14px;
    height: 14px;
    display: inline-block;
    position: relative;
    top: 2px;
    margin-right: 3px;
    &.wfb {
      background-image: url(${IconWfb});
    }
    &.yfb {
      background-image: url(${IconYfb});
    }
  }
  span {
    font-size: 12px;
  }
`;

const Tabs = styled.div`
  margin-left: 24px;
  a {
    padding: 11px 2px 11px 5px;
    margin: 0 6px;
    cursor: pointer;
    color: #5a5e66;
    &.active, &:hover {
      color: #2985f7;
    }
    &.active {
      border-bottom: solid 3px #2985f7;
    }
  }
`;

const Buttons = styled.div`
  position: absolute;
  right: 18px;
`;

const Btn = styled(Button) `
  margin: 0 4px;
`;

const ModalText = styled.div`
  margin: 16px 0;
`;

const releaseFlagMap = {
  "0": "未发布",
  "1": "已发布"
}
class PageTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      releaseVisible: false
    }
  }
  componentDidMount() {
    const { projectId } = this.context;
    const params = {
      projectId
    }
    console.log('projectId', projectId);
    this.props.getProject(projectId);
  }

  handleReleaseClick = () => {
    this.setState({
      releaseVisible: true
    });
  }

  handleReleaseCancel = () => {
    this.setState({
      releaseVisible: false
    });
  }

  handleReleaseOk = () => {
    const { projectId } = this.context;
    const { project } = this.props;
    this.setState({
      releaseVisible: false
    });
    this.props.updateProject({
      id: projectId,
      releaseFlag: project.releaseFlag === 1 ? 0 : 1
    }, () => {
      console.log('更新成功');
      this.props.getProject(projectId);
    })
  }

  render() {
    const { projectId, pageTab } = this.context;
    const { pages, project = {}, selectedPageId } = this.props;
    return (
      <Wrapper>
        <PageName>
          <i></i>
          <span>{project.projectName}</span>
        </PageName>
        <PageStatus>
          <i className={project.releaseFlag === 1 ? 'yfb' : 'wfb'}></i>
          <span>{releaseFlagMap[project.releaseFlag]}</span>
        </PageStatus>
        <Tabs>
          <Link to={"/dataSource/" + projectId} className={pageTab === 'dataSource' ? 'active' : null}>数据源接入({project.datasourceCount})</Link>
          <Link to={"/home/" + projectId} className={pageTab === 'home' ? 'active' : null}>页面构建({project.pageCount})</Link>
          {/* <span >页面构成({pages.length})</span> */}
        </Tabs>
        {
          pageTab === 'home' ? (
            <Buttons>
              <Link target="_blank" to={"/preview/" + projectId + "/" + selectedPageId}><Btn>预览</Btn></Link>
              {
                project.releaseFlag === 1 ? (
                  <Btn type="primary" onClick={this.handleReleaseClick}>已发布</Btn>
                ) : (
                    <Btn type="primary" onClick={this.handleReleaseClick}>项目发布</Btn>
                  )
              }
            </Buttons>
          ) : null
        }
        <Modal
          title={project.releaseFlag === 1 ? "取消发布" : "项目发布"}
          visible={this.state.releaseVisible}
          cancelText="取消"
          okText={project.releaseFlag === 1 ? "确认下线" : "确认发布"}
          onOk={this.handleReleaseOk}
          onCancel={this.handleReleaseCancel}
        >
          {
            project.releaseFlag === 1 ? (
              <div>
                <ModalText>确认下线此项目？</ModalText>
                <ModalText>发布地址：<a href={`${config.baseUrl}/contents/${projectId}`} target="_blank">{`${config.baseUrl}/contents/${projectId}`}</a></ModalText>
              </div>
            ) : (
                <ModalText>发布地址：{`${config.baseUrl}/contents/${projectId}`}</ModalText>
              )
          }

        </Modal>
      </Wrapper>
    )
  }
}

PageTab.contextTypes = {
  projectId: PropTypes.string,
  pageTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    components: state.home.components,
    models: state.home.models,
    pages: state.home.pageList,
    project: state.home.project,
    selectedPageId: state.home.selectedPageId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProject,
    updateProject
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTab);

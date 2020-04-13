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
  addComInstance,
  saveModelData,
  setSelectedPageId,
  getPageInfoFields,
  getPageInfoData,
  getPageInfoDataDetail
} from '../../store/home/actions.js';
import styled from 'styled-components';
import Header from '../layout/header';
import PageTab from '../layout/pageTab';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 109px);
  display: flex;
`;

const LeftPanelWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const RightPanelWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ResizeBar = styled.div`
  width: 5px;
  height: 100%;
  background: #eee;
  position: absolute;
  cursor: col-resize;
  z-index: 999;
  opacity: 0;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
      leftResize: false,
      leftPanelWidth: 220,
      rightPanelWidth: 300
    }
    const { projectId } = this.props.match.params;
    this.projectId = projectId;
  }
  handleLeftResizeMouseDown = (e) => {
    e.stopPropagation();
    this.leftResizing = true;
    this.rightResizing = false;
  }
  handleRightResizeMouseDown = (e) => {
    e.stopPropagation();
    this.leftResizing = false;
    this.rightResizing = true;
  }
  handleResizeMouseMove = (e) => {
    e.stopPropagation();
    if (this.leftResizing) {
      this.setState({
        leftPanelWidth: e.clientX
      });
    }
    if (this.rightResizing) {
      this.setState({
        rightPanelWidth: document.body.clientWidth - e.clientX
      });
    }
  }
  handleResizeMouseUp = (e) => {
    e.stopPropagation();
    this.leftResizing = false;
    this.rightResizing = false;
  }
  handlePageChange = (val) => {
    this.props.setSelectedPageId(val);
    this.props.getPageInfoFields(val, (res) => {
      const { pageInfo } = res;
      switch (pageInfo.pageType) {
        case 2:
          this.getPageDataList(val);
          break;
        case 3:
          this.getPageDataDetail(val);
          break;
        default:
          break;
      }

    })
  }
  getPageDataList = (id) => {
    this.props.getPageInfoData({ id }, (data) => {

    })
  }
  getPageDataDetail = (id) => {
    this.props.getPageInfoDataDetail({ id }, (data) => {

    })
  }
  getChildContext() {
    return {
      projectId: this.projectId,
      pageTab: 'home'
    }
  }
  render() {
    const {
      leftPanelWidth,
      rightPanelWidth
    } = this.state;
    const {
      selectedComIds
    } = this.props;
    return (
      <PageWrapper>
        <Header />
        <PageTab />
        <Wrapper
          onMouseMove={this.handleResizeMouseMove}
          onMouseUp={this.handleResizeMouseUp}
        >
          <LeftPanelWrap style={{ width: leftPanelWidth }}>
            <LeftPanel onChange={this.handlePageChange} />
          </LeftPanelWrap>
          <ResizeBar
            onMouseDown={this.handleLeftResizeMouseDown}
            style={
              { left: leftPanelWidth }
            }
          />
          <MainPanel />
          <ResizeBar
            onMouseDown={this.handleRightResizeMouseDown}
            style={
              { right: rightPanelWidth }
            }
          />
          <RightPanelWrap
            style={{
              width: rightPanelWidth,
              display: selectedComIds.length === 0 ? 'none' : 'block'
            }}
          >
            <RightPanel />
          </RightPanelWrap>
        </Wrapper>
      </PageWrapper>
    )
  }
}

Home.childContextTypes = {
  projectId: PropTypes.string,
  pageTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    pageInfoConfig: state.home.pageInfoConfig,
    selectedComIds: state.home.selectedComIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addComInstance,
    saveModelData,
    setSelectedPageId,
    getPageInfoFields,
    getPageInfoData,
    getPageInfoDataDetail
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

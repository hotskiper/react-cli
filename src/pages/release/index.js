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
  setPageConfig,
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
  height: 100%;
  display: flex;
`;

const LeftPanelWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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

const ShowLeftPanelContentBtn = styled.div`
  position: absolute;
  background: ${props => (props.display ? '#f5f5f5' : '#fff')};
  top: calc(50% + 22px);
  right: -22px;
  width: 22px;
  height: 56px;
  padding: 4px 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  transform: translateY(-50%);
  cursor: pointer;
  writing-mode: vertical-lr;
  color: #878d99;
  z-index: 10;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1);

  .icon-arrow {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0REE2QUU3NzQ5QTExRUFBQURDQTU1QUQxQTQ0OEE3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0REE2QUU4NzQ5QTExRUFBQURDQTU1QUQxQTQ0OEE3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjREQTZBRTU3NDlBMTFFQUFBRENBNTVBRDFBNDQ4QTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjREQTZBRTY3NDlBMTFFQUFBRENBNTVBRDFBNDQ4QTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7TWncJAAAAZElEQVR42mJs752pxMDAsAqIKyqL0/cwoAEmIC4HYmOQIqBiF3QFjCACKAEyIRSI3wNxGLJJjDAGLkWMyMZhU8SIbie6IiYGAoB4K/A6Ep83mYCSM3FJwkKyE4jPYpMEAYAAAwB1NTnxdhIIcgAAAABJRU5ErkJggg==')
      center center no-repeat;
    display: inline-block;
    width: 8px;
    height: 12px;
    margin-top: 4px;
    transform: ${props => (props.display ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover {
    color: #2985f7;
    .icon-arrow {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAZklEQVQYlWNgYGBg0Gz9vkqz9Xs5AxbApNn6PY2BgSGUgYGhA5sipuvVnLMYGBgqoHwMRYwwBlSiA8qtuF7N2YmiAJciFAXYFDFhczlWNxC0Aq8jcUkyMDAwMEIDaiY2SWS7cQY1ANlRNBUadkrTAAAAAElFTkSuQmCC');
    }
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
      leftResize: false,
      leftPanelWidth: 0,
      rightPanelWidth: 300,
      leftDisplay: false
    }
    const { projectId, pageId } = this.props.match.params;
    this.projectId = projectId;
    this.pageId = pageId;
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
  showLeftPanelContent = () => {
    this.setState({
      leftDisplay: !this.state.leftDisplay,
      leftPanelWidth: this.state.leftDisplay ? 0 : 220
    });
  }
  getPageDataList = (id) => {
    this.props.getPageInfoData({ id }, (data) => {

    })
  }
  getPageDataDetail = (id) => {
    this.props.getPageInfoDataDetail({ id }, (data) => {

    })
  }
  initPage = () => {
    this.pageId && this.handlePageChange(this.pageId)
  }
  componentDidMount() {
    this.initPage();
  }
  getChildContext() {
    return {
      projectId: this.projectId,
      pageId: this.pageId,
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
        <Wrapper
          onMouseMove={this.handleResizeMouseMove}
          onMouseUp={this.handleResizeMouseUp}
        >
          <LeftPanelWrap style={{ width: leftPanelWidth }}>
            <LeftPanel onChange={this.handlePageChange} style={{ display: this.state.leftDisplay ? 'block' : 'none' }} />
            <ShowLeftPanelContentBtn display={this.state.leftDisplay} onClick={this.showLeftPanelContent}>
              <span>{this.state.leftDisplay ? '收起' : '展开'}</span>
              <span className="icon-arrow"></span>
            </ShowLeftPanelContentBtn>
          </LeftPanelWrap>
          {/* <ResizeBar
            onMouseDown={this.handleLeftResizeMouseDown}
            style={
              { left: leftPanelWidth }
            }
          /> */}
          <MainPanel />
          <ResizeBar
            onMouseDown={this.handleRightResizeMouseDown}
            style={
              { right: rightPanelWidth }
            }
          />
        </Wrapper>
      </PageWrapper>
    )
  }
}

Home.childContextTypes = {
  projectId: PropTypes.string,
  pageId: PropTypes.string,
  pageTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    pageInfoConfig: state.home.pageInfoConfig,
    selectedComIds: state.home.selectedComIds,
    pageList: state.home.pageList,
    selectedPageId: state.home.selectedPageId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addComInstance,
    saveModelData,
    setSelectedPageId,
    setPageConfig,
    getPageInfoFields,
    getPageInfoData,
    getPageInfoDataDetail
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

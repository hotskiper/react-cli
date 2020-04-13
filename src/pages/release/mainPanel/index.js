import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import {
  getProject,
  getPageInfoData,
  getPageInfoDataDetail,
  setPageConfig,
  setSelectedPageId,
  setSelectedComId
} from '../../../store/home/actions.js';
// import './index.css';
import Input from '../../../components/input';
import Search from '../../../components/search';
import Table from '../../../components/table';
import PageDetail from '../../../components/detailList';
const bgImage = require('./images/wg.png');

const Wrapper = styled.div`
  flex: 1;
  padding: 5px;
  background-color: #f5f5f5;
  padding: 0;
  width: 1400px;
  overflow: scroll;
`;

const PageWrap = styled.div`
  padding: 16px;
  background-color: #f4f7fd;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  handleTableChange = (params, fn) => {
    console.log('mainPanel', params);
    const {
      selectedPageId,
      getPageInfoData
    } = this.props;
    getPageInfoData(Object.assign({
      id: selectedPageId
    }, params), (data) => {
      fn && fn()
    })
  }
  /**
   * 处理页面事件
   * 查看详情 - detail
   * 返回列表 - list 
   */
  handleEventsChange = (event) => {
    const { selectedPageId, pageList } = this.props;
    const pageInfo = pageList.filter(m => String(m.id) === String(selectedPageId))[0];
    // 查看详情
    if (event.type === 'detail') {
      const config = {
        pageType: 3,
        ctid: event.data.ctid
      }
      this.props.setPageConfig({
        config
      })
      this.props.getPageInfoDataDetail({
        id: pageInfo.id,
        ctid: event.data.ctid.value
      }, (data) => {

      })
    }
    // 返回列表
    if (event.type === 'list') {
      const config = {
        pageType: 2
      }
      this.props.setPageConfig({
        config
      })
      this.props.getPageInfoData({
        id: pageInfo.id
      }, (data) => {

      })
    }
  }
  handleComSelected = (com, e) => {
    console.log('setSelectedComId', e, com);
    e.stopPropagation();
    this.props.setSelectedComId([com.id]);
  }
  handlePageClick = () => {
    console.log('handlePageClick');
    this.props.setSelectedComId([]);
  }
  renderPage = () => {
    let pageJsx = null;
    const {
      selectedPageId,
      pageInfoPage = {},
      pageList = [],
      pageInfoFields = [],
      pageInfoData = [],
      pageInfoDataDetail,
      pageConfig,
      project
    } = this.props;
    const pageInfo = pageList.filter(m => String(m.id) === String(selectedPageId))[0];
    console.log('pageInfoDataDetail', pageConfig, pageInfo);
    if (!pageInfo) return null;
    const pageType = (pageConfig && pageConfig.config.pageType) || pageInfo.pageType
    switch (pageType) {
      case 2:
        pageJsx = (
          <div>
            <Search project={project} link={"/contents/"+project.id} />
            <PageWrap onClick={this.handleComSelected.bind(this, {
              type: 'table',
              id: selectedPageId
            })}>
              <Table
                columns={pageInfoFields}
                dataSource={pageInfoData}
                pageInfo={pageInfo}
                pageInfoPage={pageInfoPage}
                onChange={this.handleTableChange}
                onEventsChange={this.handleEventsChange}
              />
            </PageWrap>
          </div>
        )
        break;
      case 3:
        pageJsx = (
          <div>
            <Search project={project} />
            <PageWrap>
              <PageDetail
                columns={pageInfoFields}
                data={pageInfoDataDetail}
                pageInfo={pageInfo}
                onEventsChange={this.handleEventsChange}
              />
            </PageWrap>
          </div>
        )
        break;
      default:
        break;
    }
    return pageJsx;
  }
  componentDidMount() {
    const { projectId } = this.context;
    const params = {
      projectId
    }
    console.log('projectId', projectId);
    this.props.getProject(projectId);
  }
  render() {
    const {
      selectedPageId
    } = this.props;
    if (selectedPageId === null) {
      return <Wrapper />;
    }
    return (
      <Wrapper className="ace-scroll-bar" onClick={this.handlePageClick}>
        {this.renderPage()}
      </Wrapper>
    )
  }
}

MainPanel.contextTypes = {
  projectId: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    pageList: state.home.pageList,
    selectedPageId: state.home.selectedPageId,
    pageInfoFields: state.home.pageInfoFields,
    pageInfoData: state.home.pageInfoData.data,
    pageInfoPage: state.home.pageInfoData.page,
    pageInfoDataDetail: state.home.pageInfoDataDetail,
    pageConfig: state.home.pageConfig,
    project: state.home.project
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProject,
    getPageInfoData,
    getPageInfoDataDetail,
    setPageConfig,
    setSelectedPageId,
    setSelectedComId
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPanel);

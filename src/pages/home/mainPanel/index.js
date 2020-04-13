import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import _ from 'lodash';
import {
  addComInstance,
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
  background-image: url(${bgImage});
  background-color: #f5f5f5;
  padding: 32px;
  width: 1400px;
  overflow: scroll;
`;

const PageWrap = styled.div`
  padding: 16px;
  background-color: #f4f7fd;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ComWrap = styled.div`
  border: solid 2px rgba(0,0,0,0);
  &:hover {
    border-color: #2985f7;
  }
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
    const pageInfo = pageList.filter(m => m.id === selectedPageId)[0];
    console.log('pageInfoDataDetail', pageInfoDataDetail);
    switch (pageConfig.config.pageType) {
      case 2:
        pageJsx = (
          <div>
            <Search project={project} />
            <PageWrap onClick={this.handleComSelected.bind(this, {
              type: 'table',
              id: selectedPageId
            })}>
              <ComWrap>
                <Table
                  columns={pageInfoFields}
                  dataSource={pageInfoData}
                  pageInfo={pageInfo}
                  pageInfoPage={pageInfoPage}
                  onChange={this.handleTableChange}
                  onEventsChange={this.handleEventsChange}
                />
              </ComWrap>
            </PageWrap>
          </div>
        )
        break;
      case 3:
        pageJsx = (
          <div>
            <Search project={project} />
            <PageWrap>
              <ComWrap>
                <PageDetail
                  columns={pageInfoFields}
                  data={pageInfoDataDetail}
                  pageInfo={pageInfo}
                  onEventsChange={this.handleEventsChange}
                />
              </ComWrap>
            </PageWrap>
          </div>
        )
        break;
      default:
        break;
    }
    return pageJsx;
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
    addComInstance,
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

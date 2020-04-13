import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ComponentsList from './coms';
import {
  addComInstance,
  saveModelData,
  getHomePageInfo,
  getPageInfoFields,
  setPageConfig
} from '../../../store/home/actions.js';

const IconPage = require('./images/ym.png');
const IconPageHover = require('./images/ym-click.png');

const Wrapper = styled.div`
  height: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0;
  background: #fff;
`;

const PanelHead = styled.div`
  height: 44px;
  line-height: 44px;
  padding-left: 24px;
  border-bottom: solid 1px #ddd;
  font-size: 16px;
  font-weight: bold;
  color: #0e1011;
`;

const PanelBody = styled.div`
  padding: 0;
  height: calc(100% - 50px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const PageList = styled.ul`
  padding: 0;
`;

const PageItem = styled.li`
  padding: 8px 24px;
  list-style-type: none;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  i {
    width: 12px;
    height: 12px;
    display: inline-block;
    background-image: url(${IconPage});
    background-repeat: no-repeat;
    margin-right: 4px;
    position: relative;
    top: 1px;
  }
  &.active, &:hover {
    color: #298df8;
    background-color: #f5f5f5;
    i {
      background-image: url(${IconPageHover});
    }
  }
`;

class LeftPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
      activePageId: null
    }
  }
  handlePageClick = (page) => {
    console.log('page', page);
    this.setState({
      activePageId: page.id
    });
    this.props.setPageConfig({
      config: page
    })
    const { onChange } = this.props;
    onChange && onChange(page.id);
  }
  componentDidMount() {
    const { projectId } = this.context;
    const params = {
      projectId,
      showFlag: 1
    }
    this.props.getHomePageInfo(params, (pages) => {
      console.log('请求数据模型完成', pages);
      // 初始化列表
      this.handlePageClick(pages[0]);
    })
  }
  render() {
    console.log('left-panel', this.props);
    const { models, components, pages, style } = this.props;
    const _pages = pages.filter(page => page.pageType === 2);
    return (
      <Wrapper>
        {/* <ComponentsList
          models={models}
          components={components}
          addCom={this.props.addComInstance}
        /> */}
        <PanelHead>
          页面列表
        </PanelHead>
        <PanelBody className="ace-scroll-bar">
          <PageList>
            {pages.map((page) => {
              return (
                <PageItem
                  className={this.state.activePageId === page.id ? 'active' : null}
                  onClick={this.handlePageClick.bind(this, page)}
                  key={page.pageName}
                >
                  <i></i>
                  {page.pageName}
                </PageItem>
              )
            })}
          </PageList>
        </PanelBody>
      </Wrapper>
    )
  }
}

LeftPanel.contextTypes = {
  projectId: PropTypes.string,
  test: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    components: state.home.components,
    models: state.home.models,
    pages: state.home.pageList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addComInstance,
    saveModelData,
    getHomePageInfo,
    getPageInfoFields,
    setPageConfig
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanel);

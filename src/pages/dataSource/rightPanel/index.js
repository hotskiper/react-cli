import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Button } from 'antd';
import styled from 'styled-components';

const RightPanelWrap = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
  background: #fff;
  border-left: 1px solid #d9dfeb;

  .right-panel-header {
    display: flex;
    padding: 0 24px;
    height: 44px;
    justify-content: space-between;
    align-items: center;

    .panel-header-left {
      font-size: 16px;
      color: #0e1011;
    }

    .panel-header-right {
      font-size: 14px;
      color: #878d99;

      .header-right-info {
        display: inline-block;
        margin-right: 16px;

        .page-number {
          margin: 0 4px;
          color: #fa5555;
          font-weight: bold;
        }
      }
    }
  }

  .right-panel-content {
    position: relative;
    padding: 16px 24px;
    height: calc(100% - 44px);
    border-top: 1px solid #d9dfeb;
    overflow-y: auto;

    .no-data-wrap {
      position: absolute;
      display: none;
      width: 144px;
      height: 160px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #b4bccc;

      &.show {
        display: block;
      }

      .icon-no-data {
        width: 144px;
        height: 140px;
        background: url('/images/dataSource/no_data.png') center center no-repeat;
      }
    }
  }

  .error-wrap,
  .loading-wrap {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    color: #b4bccc;

    &.hide {
      display: none;
    }

    .error-page-wrap,
    .icon-loading-wrap {
      position: absolute;
      width: 250px;
      height: 148px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .icon-loading {
        width: 160px;
        height: 128px;
        margin: 0 auto;
        background: url('/images/dataSource/icon-loading.webp') center center no-repeat;
      }

      .icon-error {
        width: 121px;
        height: 127px;
        margin: 0 auto;
        background: url('/images/dataSource/icon_error.png') center center no-repeat;
      }

      .loading-info {
        text-align: center;
        margin-top: 16px;
      }

      .error-info-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        font-size: 12px;

        .error-info {
          margin-right: 8px;
        }
      }
    }
  }
`;

const PageItem = styled.div`
  position: relative;
  margin-bottom: 32px;

  .page-header {
    padding-bottom: 8px;
    font-size: 14px;
    color: #0e1011;
  }

  .page-content {
    display: flex;
    .page-item {
      position: relative;
      width: 258px;
      height: 188px;
      border: 1px solid #d0d8e3;
      border-radius: 3px;
      margin-right: 8px;

      .page-item-type {
        height: 144px;
        background: url('/images/dataSource/list.png') center center no-repeat;

        &.page-type-person-3 {
          background-image: url('/images/dataSource/person.png');
        }

        &.page-type-car-3 {
          background-image: url('/images/dataSource/car.png');
        }

        &.page-type-mobile-3 {
          background-image: url('/images/dataSource/mobile.png');
        }

        &.page-type-common-3 {
          background-image: url('/images/dataSource/common.png');
        }
      }

      .page-item-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        left: 0;
        bottom: 0;
        padding: 0 8px;
        border-top: 1px solid #d0d8e3;
        font-size: 14px;

        .page-name {
          color: #2d2f33;
          width: 160px;
        }

        .page-type {
          background: #e9f3fe;
          padding: 2px 8px;
          border-radius: 40px;
          color: #2985f7;
        }
      }
    }
  }
`;

const pageTypeArray = ['首页', '列表页面', '详情页面'];

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: [],
      checkList: [],
      checkedList: [],
      indeterminate: false,
      checkAll: false
    };
  }

  componentWillReceiveProps() {
    let handleData = this.handleData(this.props.data);
    this.setPageList(handleData);
    this.setCheckList(handleData);
    this.setDefaultCheckedList(handleData);
  }

  chooseAllPage = e => {
    this.setState({
      checkedList: e.target.checked ? this.state.checkList : [],
      indeterminate: false,
      checkAll: e.target.checked
    });

    this.savaChoosePage(e.target.checked ? this.state.checkList : [], this.state.pageList);
  };

  choosePage = checkedList => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < this.state.pageList.length,
      checkAll: checkedList.length === this.state.pageList.length
    });

    this.savaChoosePage(checkedList, this.state.pageList);
  };

  savaChoosePage = (checkedList, pageList) => {
    let ids = [];

    let checkedPageList = [].concat.apply(
      [],
      pageList.filter((item, index) => {
        return checkedList.indexOf(index.toString()) > -1;
      })
    );

    checkedPageList.map(page => {
      ids.push(page.id);
    });

    this.props.savaChoosePage(ids.join(','));
  };

  handleData(array) {
    return array.reduce((res, item) => {
      res[item.instanceId] ? res[item.instanceId].push(item) : (res[item.instanceId] = [item]);
      return res;
    }, {});
  }

  handlePageList(array) {
    return Object.values(array);
  }

  handleCheckData(array) {
    return Object.keys(array);
  }

  handleDefaultCheckedList(array) {
    let checkedList = [];
    array.map((pages, index) => {
      if (pages[0].showFlag.toString() === '1') {
        checkedList.push(index.toString());
      }
    });

    return checkedList;
  }

  setPageList(data) {
    this.setState({
      pageList: this.handlePageList(data)
    });
  }

  setCheckList(data) {
    this.setState({
      checkList: this.handleCheckData(this.handlePageList(data))
    });
  }

  setDefaultCheckedList(data) {
    this.setState({
      checkedList: this.handleDefaultCheckedList(this.handlePageList(data))
    });
  }

  render() {
    console.log(this.state.checkedList);
    return (
      <RightPanelWrap>
        <div className="right-panel-header">
          <div className="panel-header-left">
            <Checkbox onChange={this.chooseAllPage} indeterminate={this.state.indeterminate} checked={this.state.checkList.length === this.state.checkedList.length}>
              生成实体页面结果
            </Checkbox>
          </div>
          <div className="panel-header-right">
            <span className="header-right-info">
              已选择<span className="page-number">{this.state.checkedList.length}</span>个实体
            </span>
            <Link style={{ display: this.state.checkedList.length === 0 ? 'none' : 'inline-block' }} to={'/home/' + this.props.projectId}>
              <Button type="primary">去构建页面</Button>
            </Link>
            <Button style={{ display: this.state.checkedList.length !== 0 ? 'none' : 'inline-block' }} disabled type="primary">
              去构建页面
            </Button>
          </div>
        </div>
        <div className="right-panel-content">
          <Checkbox.Group onChange={this.choosePage} value={this.state.checkedList}>
            {this.state.pageList.map((pages, index) => {
              return (
                <PageItem key={index}>
                  <div className="page-header">
                    <Checkbox value={index.toString()}>
                      {pages[0]['entityCname']}实体（来自表：{pages[0]['tableName']}）
                    </Checkbox>
                  </div>
                  <div className="page-content">
                    {pages.map(page => {
                      return (
                        <div className="page-item" key={page.id}>
                          <div className={'page-item-type page-type-' + page.entityEname.toLowerCase() + '-' + page.pageType}></div>
                          <div className="page-item-bottom">
                            <div className="page-name ellipsis">{page.pageName}</div>
                            <div className="page-type">{pageTypeArray[page.pageType - 1]}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PageItem>
              );
            })}
          </Checkbox.Group>
          <div className={this.state.pageList.length > 0 ? 'no-data-wrap' : 'no-data-wrap show'}>
            <div className="icon-no-data"></div>
            <div className="no-data-info">暂无页面</div>
          </div>
        </div>
        <div className={this.props.pageLoading ? 'loading-wrap' : 'loading-wrap hide'}>
          <div className="icon-loading-wrap">
            <div className="icon-loading"></div>
            <div className="loading-info">正在智能生成页面，请耐心等待</div>
          </div>
        </div>
        <div className={this.props.taskFail ? 'error-wrap' : 'error-wrap hide'}>
          <div className="error-page-wrap">
            <div className="icon-error"></div>
            <div className="error-info-wrap">
              <span className="error-info">任务失败</span>
              <Button type="primary" size="small" onClick={this.props.setRunTaskById}>
                重试
              </Button>
            </div>
          </div>
        </div>
      </RightPanelWrap>
    );
  }
}

export default RightPanel;

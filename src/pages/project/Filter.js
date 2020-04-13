import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { searchProjects } from '../../store/project/actions.js';
const { Search } = Input;
const Filter = props => {
  const searchAction = e => {
    if (e.target.value || e.target.value.trim()) {
      props.searchProjects(e.target.value, a => {
        // 查询结果在此回调
        props.filterAction(true);
      });
    } else {
      //重置页面列表
      props.filterAction(false);
    }
  };

  return (
    <div className="title">
      <div className="titleDes">
        <h3>
          <i></i>我的项目
        </h3>
        <span>（STEP1：新建项目，STEP2：根据数据源即智能生成页面）</span>
      </div>
      <div className="filter">
        <Search onChange={searchAction} placeholder="请输入关键字"></Search>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchProjects
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

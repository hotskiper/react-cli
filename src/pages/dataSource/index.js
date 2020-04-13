import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';
import { getSourceList, getEntityRelation, getTaskState, getPageList, getDataSourceNames, addDataSource, setPageStatus, getDataSourceDetect, setRunTask } from '../../store/dataSource/actions.js';
import { getProject } from '../../store/home/actions.js';
import styled from 'styled-components';
import Header from '../layout/header';
import PageTab from '../layout/pageTab';

const DataSourceWrap = styled.div`
  position: relative;
  display: flex;
  height: calc(100% - 109px);
`;

let timer = undefined;

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

class DataSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      activeId: '',
      dataSourceNames: [],
      pageLoading: true,
      entityloading: true,
      modalVisible: false,
      tipsShow: false,
      taskFail: false
    };

    this.projectId = this.props.match.params.projectId;
    this.sorceData = '';
    this.activeIndex = '';
  }

  componentDidMount() {
    this.getSourceList(this.projectId, 0);
  }

  componentWillUnMount() {
    if (timer !== null) {
      clearInterval(timer);
    }
  }

  getSourceList = (id, index) => {
    this.props.getSourceList(id, source => {
      console.log('请求数据源列表完成');
      let key = index === 'new' ? source.length - 1 : index;
      this.sorceData = source;
      this.getSourceData(source[key]);
    });
  };

  handleChange = index => {
    console.log(index);
    this.getSourceData(this.getSourceForIndex(index));
  };

  getSourceForIndex(index) {
    this.activeIndex = index;
    return this.sorceData[index];
  }

  getSourceData(source) {
    this.state.name = source.connName;
    this.state.activeId = source.id;
    this.timerStart(source);
  }

  timerStart(source) {
    this.timerStop();
    timer = setInterval(() => {
      this.getTaskStateFn(source);
    }, 500);
  }

  timerStop() {
    if (timer !== null) {
      clearInterval(timer);
    }
  }

  getTaskStateFn(source) {
    this.setPageLoading(true);
    this.setEntityLoading(true);
    this.setTaskFail(false);
    this.props.getTaskState(source.recTaskId, data => {
      console.log('请求生成实体任务状态');

      let { taskStatus } = data;
      if (taskStatus.toString() === '2') {
        this.timerStop();

        this.props.getEntityRelation(source.id, () => {
          console.log('请求实体信息完成');
          this.setEntityLoading(false);
        });

        this.props.getPageList(source.id, () => {
          console.log('请求页面列表完成');
          this.setPageLoading(false);
        });
      }

      if (taskStatus.toString() === '-1') {
        this.timerStop();
        this.setPageLoading(false);
        this.setEntityLoading(false);
        this.setTaskFail(true);
      }
    });
  }

  setRunTaskById = () => {
    this.setPageLoading(true);
    this.setEntityLoading(true);
    this.setTaskFail(false);
    let source = this.sorceData[this.activeIndex];
    this.props.setRunTask(source.recTaskId, () => {
      this.timerStart(source);
    });
  };

  getSourceNameData = formData => {
    this.props.getDataSourceNames(formData, data => {
      this.setState({
        dataSourceNames: data
      });
    });
  };

  getDataSourceDetectStatus = formData => {
    this.props.getDataSourceDetect(formData, data => {
      if (data.toString() === '0') {
        this.getSourceNameData(formData);
        this.setState({
          tipsShow: false
        });
      } else {
        this.setState({
          dataSourceNames: [],
          tipsShow: true
        });
      }
    });
  };

  handleAddSourceModal = formData => {
    let params = Object.assign({}, formData, { projectId: this.projectId });
    this.props.addDataSource(params, data => {
      console.log(data);
      this.hideAddSourceModal();
      this.getSourceList(this.projectId, 'new');
    });
  };

  setPageLoading = bool => {
    this.setState({
      pageLoading: bool
    });
  };

  setEntityLoading = bool => {
    this.setState({
      entityloading: bool
    });
  };

  setTaskFail = bool => {
    this.setState({
      taskFail: bool
    });
  };

  showAddSourceModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  hideAddSourceModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  savaChoosePage = ids => {
    let params = {
      pageIds: ids,
      datasourceId: this.state.activeId
    };

    this.props.setPageStatus(params, () => {
      console.log('保存页面状态完成');
      this.props.getProject(this.projectId);
    });
  };

  getChildContext() {
    return {
      projectId: this.projectId,
      pageTab: 'dataSource'
    };
  }

  render() {
    return (
      <Wrapper className="ace-scroll-bar">
        <Header />
        <PageTab />
        <DataSourceWrap>
          <LeftPanel
            data={this.props}
            name={this.state.name}
            modalVisible={this.state.modalVisible}
            activeId={this.state.activeId}
            entityloading={this.state.entityloading}
            tipsShow={this.state.tipsShow}
            onChange={this.handleChange}
            showAddSourceModal={this.showAddSourceModal}
            hideAddSourceModal={this.hideAddSourceModal}
            handleAddSourceModal={this.handleAddSourceModal}
            sourceNameData={this.state.dataSourceNames}
            getDataSourceDetectStatus={this.getDataSourceDetectStatus}
            taskFail={this.state.taskFail}
          />
          <RightPanel
            pageLoading={this.state.pageLoading}
            data={this.props.pageList}
            projectId={this.projectId}
            savaChoosePage={this.savaChoosePage}
            setRunTaskById={this.setRunTaskById}
            taskFail={this.state.taskFail}
          />
        </DataSourceWrap>
      </Wrapper>
    );
  }
}

DataSource.childContextTypes = {
  projectId: PropTypes.string,
  pageTab: PropTypes.string
};

const mapStateToProps = state => {
  return {
    sourceList: state.dataSource.sourceList,
    entityRelation: state.dataSource.entityRelation,
    taskState: state.dataSource.taskState,
    pageList: state.dataSource.pageList,
    dataSourceNames: state.dataSource.dataSourceNames
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getSourceList,
      getEntityRelation,
      getTaskState,
      setRunTask,
      getPageList,
      getDataSourceNames,
      addDataSource,
      getDataSourceDetect,
      setPageStatus,
      getProject
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DataSource);

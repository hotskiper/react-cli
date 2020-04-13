import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Input, Select, message, Spin } from 'antd';
import Filter from './Filter';
import Add from './Add';
import Item from './Item';
import {
  getProjectList,
  getDataBaseList,
  createProject,
  checkResourceConnect,
  checkProjectName
} from '../../store/project/actions.js';

const Promise = window.Promise;
const List = props => {
  const [createVisible, setCreateVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);
  const [filter, setFilter] = useState(false);
  const options = props.dataBaseList || '';
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 16
    }
  };

  const filterAction = e => {
    setFilter(e);
  };

  useEffect(() => {
    props.getProjectList();
  }, []);

  const showModal = e => {
    setCreateVisible(true);
  };

  const handleCancel = e => {
    form.resetFields();
    setCreateVisible(false);
  };

  const DropdownVisible = async () => {
    try {
      const values = await form.getFieldsValue();
      //监测数据链接
      await new Promise((resolve, reject) => {
        props.checkResourceConnect(
          Object.assign(
            {
              dbType: 1
            },
            values.dataSource
          ),
          e => {
            //数据库连接成功
            if (e.code === 0) {
              resolve();
            } else {
              //数据库连接失败提示
              reject(e.msg);
            }
          }
        );
      });

      //下拉嗅探数据库
      await new Promise((resolve, reject) => {
        props.getDataBaseList(
          Object.assign({}, values.dataSource, { dbType: 1 }),
          e => {
            //嗅探数据库成功
            if (e.code === 0) {
              resolve();
            } else {
              //嗅探数据库异常
              reject(e.msg);
            }
          }
        );
      });
    } catch (errorInfo) {
      setSpinVisible(false);
      typeof errorInfo === 'string' && message.error(errorInfo);
      console.log(errorInfo);
    }
  };

  const checkName = (value, msg) => {
    return new Promise((resolve, reject) => {
      props.checkProjectName(value, e => {
        if (e.data.code === 0 && e.data.data.length === 0) {
          resolve();
        } else {
          reject(msg);
        }
      });
    });
  };

  //创建项目
  const addProject = async () => {
    try {
      setSpinVisible(true);
      await form.validateFields();
      const values = form.getFieldsValue();
      await checkName(`projectName=${values.project.name}`, '项目名称已存在！');
      await checkName(
        `projectEname=${values.project.projectEname}`,
        '项目英文名已存在！'
      );
      const {
        ip: dbIp,
        name: projectName,
        projectDesc,
        username,
        password,
        connName: description,
        dbType,
        databaseName: dbName,
        projectEname
      } = Object.assign({}, values.dataSource, values.project, {
        dbType: 1
      });

      //创建项目
      const getId = await new Promise((resolve, reject) => {
        props.createProject(
          {
            dbIp,
            projectName,
            projectDesc,
            username,
            password,
            description,
            dbType,
            dbName,
            projectEname
          },
          e => {
            if (e.code === 0) {
              resolve(e.data);
              // 不跳转页面需要刷新列表
            } else {
              //项目创建失败提示
              reject(e.msg);
            }
          }
        );
      });

      message.success('项目创建成功,即将跳转配置页', 3);
      //重置弹窗
      form.resetFields();
      //隐藏弹窗
      setCreateVisible(false);
      //更新项目列表
      props.getProjectList();
      //停留3s,跳转数据源页面
      setTimeout(() => {
        window.location.href = `http://${window.location.host}/dataSource/${getId}`;
      }, 3000);
    } catch (errorInfo) {
      setSpinVisible(false);
      typeof errorInfo === 'string' && message.error(errorInfo);
      console.log(errorInfo);
    }
  };

  return (
    <React.Fragment>
      <Modal
        title="新建项目"
        width="750px"
        visible={createVisible}
        onCancel={handleCancel}
        okText="创建项目"
        closable={!spinVisible}
        maskClosable={false}
        okButtonProps={{ disabled: spinVisible }}
        cancelButtonProps={{ disabled: spinVisible }}
        cancelText="取消"
        onOk={addProject}
      >
        <Spin spinning={spinVisible} delay={500}>
          <Form {...layout} form={form} className="createProject">
            <div className="projectInfo">
              <span className="description">填写项目基本信息</span>
              <Form.Item
                name={['project', 'name']}
                label="项目名称"
                rules={[
                  {
                    required: true,
                    message: '请输入名称'
                  }
                ]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item
                name={['project', 'projectEname']}
                label="项目英文名"
                rules={[
                  {
                    required: true,
                    message: '请输入项目英文名'
                  }
                ]}
              >
                <Input placeholder="请输入项目英文名" />
              </Form.Item>
              <Form.Item name={['project', 'projectDesc']} label="项目描述">
                <Input.TextArea rows={5} placeholder="请输入项目描述" />
              </Form.Item>
            </div>
            <div className="dataSourceInfo">
              <span className="description">填写数据源配置信息</span>
              <Form.Item
                name={['dataSource', 'ip']}
                label="数据库IP"
                rules={[
                  {
                    required: true,
                    message: '请输入数据库IP'
                  },
                  {
                    pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                    message: '输入正确IP 如:188.88.88.8'
                  }
                ]}
              >
                <Input placeholder="请输入数据库IP" />
              </Form.Item>
              <Form.Item
                name={['dataSource', 'username']}
                label="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名'
                  }
                ]}
              >
                <Input placeholder="请输入数据库用户名" />
              </Form.Item>
              <Form.Item
                name={['dataSource', 'password']}
                label="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码'
                  }
                ]}
              >
                <Input.Password placeholder="请输入数据库密码" />
              </Form.Item>
              <Form.Item
                name={['dataSource', 'databaseName']}
                label="数据库"
                rules={[
                  {
                    required: true,
                    message: '选择数据库'
                  }
                ]}
              >
                <Select
                  onDropdownVisibleChange={DropdownVisible}
                  placeholder="请选择数据库"
                >
                  {options.length &&
                    options.map((i, a) => (
                      <Select.Option key={++a} value={i}>
                        {i}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item name={['dataSource', 'connName']} label="连接名">
                <Input placeholder="请输入数据库连接名" />
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </Modal>
      <Filter filterAction={filterAction} />
      <ul className="projectList">
        <li onClick={showModal}>
          <Add />
        </li>
        {(List = filter ? props.filterResult : props.projectList) &&
          (List = filter ? props.filterResult : props.projectList).map(item => (
            <li key={item.id}>
              <Item
                id={item.id}
                projectName={item.projectName}
                enName={item.enName}
                projectDesc={item.projectDesc}
                projectEname={item.projectEname}
                status={item.releaseFlag}
                dataSource={item.datasourceCount}
                pages={item.pageCount}
                getProjectList={props.getProjectList}
                checkName={checkName}
              />
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {
    projectList: state.project.projectList,
    dataBaseList: state.project.dataBaseList,
    filterResult: state.project.filterResult
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getProjectList,
      getDataBaseList,
      createProject,
      checkResourceConnect,
      checkProjectName
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

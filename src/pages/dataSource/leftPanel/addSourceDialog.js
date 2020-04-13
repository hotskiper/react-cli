import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import styled from 'styled-components';

const ErrorTips = styled.div`
  position: absolute;
  display: none;
  align-items: center;
  padding: 0 4px;
  left: 141px;
  top: 56px;
  width: 355px;
  height: 22px;
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;

  &.show {
    display: flex;
  }

  .icon-password-error {
    width: 14px;
    height: 14px;
    background: url('/images/dataSource/warning.png') center center no-repeat;
    display: inline-block;
    margin-right: 4px;
  }
`;

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};

const { Option } = Select;

class AddSourceDialog extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  cancelAddSourceModal = () => {
    this.props.hideAddSourceModal();
  };

  handleAddSourceModal = () => {
    this.formRef.current
      .validateFields()
      .then(values => {
        this.props.handleAddSourceModal(values);
      })
      .catch(error => {});
  };

  getDataSourceDetectStatus = open => {
    const validateFields = ['ip', 'username', 'password'];

    if (!open) {
      return;
    }

    this.formRef.current
      .validateFields(validateFields)
      .then(values => {
        this.props.getDataSourceDetectStatus(values);
      })
      .catch(error => {});
  };

  render() {
    // console.log(this.props.sourceNameData);
    return (
      <Modal
        wrapClassName="add-source-dialog"
        title="新增数据源"
        okText="确定"
        cancelText="取消"
        centered
        visible={this.props.modalVisible}
        onOk={this.handleAddSourceModal}
        onCancel={this.cancelAddSourceModal}
      >
        <ErrorTips className={this.props.tipsShow ? 'show' : ''}>
          <span className="icon-password-error"></span>用户名与密码不匹配
        </ErrorTips>
        <Form {...layout} ref={this.formRef}>
          <Form.Item
            name="ip"
            label="数据库Ip"
            rules={[
              {
                required: true,
                message: '请输入数据库IP'
              }
            ]}
          >
            <Input placeholder="请输入数据库IP"/>
          </Form.Item>
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名'
              }
            ]}
          >
            <Input placeholder="请输入数据库用户名"/>
          </Form.Item>
          <Form.Item
            name="password"
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
            name="connName"
            label="数据库"
            rules={[
              {
                required: true,
                message: '数据库不能为空'
              }
            ]}
          >
            <Select placeholder="请选择数据库" onDropdownVisibleChange={this.getDataSourceDetectStatus}>
              {this.props.sourceNameData.map((source, index) => {
                return (
                  <Option value={source} key={index}>
                    {source}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="连接名">
            <Input placeholder="请输入数据库连接名" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddSourceDialog;

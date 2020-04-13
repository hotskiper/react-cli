import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip, Modal, Form, Input, message, Checkbox } from 'antd';
import { ExclamationCircleOutlined, CloseOutLined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { editProject, deleteProject } from '../../store/project/actions.js';
import preview from './images/preview.png';
import setOnlineIcon from './images/setOnlineIcon.png';
import setOfflineIcon from './images/setOfflineIcon.png';
import edit from './images/edit.png';
import deleteItem from './images/delete.png';
import typeA from './images/typeA.png';
const Promise = window.Promise;
const Item = props => {
  const [selected, setSelected] = useState('');
  const [editVisible, setEditVisible] = useState(false);
  const [waterMark, setWaterMark] = useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 18
    }
  };
  const handleMouseOver = e => {
    setSelected('selected');
  };
  const handleMouseOut = () => {
    setSelected('');
  };
  const editItem = () => {
    setEditVisible(true);
    form.setFieldsValue({
      project: {
        projectName: props.projectName,
        projectEname: props.projectEname,
        projectDesc: props.projectDesc
      }
    });
  };
  const setOffline = () => {
    const setOfflineConfirm = Modal.confirm({
      title: '取消发布',
      width: '500px',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          <span>确认下线此项目?</span>
          <span className="ant-modal-close-x">
            <span
              role="img"
              aria-label="close"
              className="anticon anticon-close ant-modal-close-icon"
              onClick={e => {
                closeConfirm(setOfflineConfirm);
              }}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </span>
          </span>
        </span>
      ),
      okText: '确认下线',
      cancelText: '取消',
      onOk() {
        const data = {
          id: props.id,
          releaseFlag: 0
        };
        props.editProject(data, e => {
          e.code === 0 && message.success(e.msg) && props.getProjectList();
          e.code === -1 && message.error(e.msg);
        });
      },
      onCancel() {}
    });
  };
  const CopyUrl = data => {
    const cliBoardContent = `http://${window.location.host}/contents/${props.id}`;
    copy(cliBoardContent);
    message.success('发布地址复制成功', 2);
  };
  const setOnline = () => {
    const setOnLineConfirm = Modal.confirm({
      title: '确认发布',
      width: '560px',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <ul className="releaseModel">
            <li>
              <span className="label">发布地址:</span>
              <span className="">{`http://${window.location.host}/contents/${props.id}`}</span>
            </li>
            <li>
              <span className="label"></span>
              <Checkbox
                defaultChecked={waterMark}
                onChang={() => {
                  setWaterMark(!waterMark);
                }}
              >
                添加水印
              </Checkbox>
            </li>
          </ul>
          <span className="ant-modal-close-x">
            <span
              role="img"
              aria-label="close"
              className="anticon anticon-close ant-modal-close-icon"
              onClick={e => {
                closeConfirm(setOnLineConfirm);
              }}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </span>
          </span>
        </div>
      ),
      okText: '确认发布',
      cancelText: '取消',
      onOk() {
        const data = {
          id: props.id,
          waterMark: +waterMark,
          releaseFlag: 1
        };
        props.editProject(data, e => {
          e.code === 0 && message.success(e.msg) && props.getProjectList();
          e.code === -1 && message.error(e.msg);
        });
      },
      onCancel() {}
    });
  };
  const closeConfirm = e => {
    e && e.destroy();
  };
  const deleItem = () => {
    const confirmModal = Modal.confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          确认删除此项？
          <span className="ant-modal-close-x">
            <span
              role="img"
              aria-label="close"
              className="anticon anticon-close ant-modal-close-icon"
              onClick={e => {
                closeConfirm(confirmModal);
              }}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </span>
          </span>
        </span>
      ),
      okText: '确认删除',
      cancelText: '取消',
      onOk() {
        props.deleteProject(props.id, e => {
          e.code === 0 && message.success(e.msg) && props.getProjectList();
          e.code === -1 && message.error(e.msg);
        });
      },
      onCancel() {}
    });
  };

  const editOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const EditedName = values.project.projectName !== props.projectName;
      const EditedEname = values.project.projectEname !== props.projectEname;
      const projectDesc = values.project.projectDesc !== props.projectDesc;
      const EditedNameValue = EditedName
        ? { projectName: values.project.projectName }
        : {};
      const projectEnameValue = EditedEname
        ? { projectEname: values.project.projectEname }
        : {};
      const projectDescValue = projectDesc
        ? { projectDesc: values.project.projectDesc }
        : {};
      if (!EditedName && !EditedEname && !projectDesc) {
        throw '未有任何操作！';
      }

      EditedName &&
        (await props.checkName(
          `projectName=${values.project.projectName}`,
          '项目名称已存在！'
        ));

      EditedEname &&
        (await props.checkName(
          `projectEname=${values.project.projectEname}`,
          '项目英文名已存在！'
        ));

      const data = Object.assign(
        {
          id: props.id
        },
        EditedNameValue,
        projectEnameValue,
        projectDescValue
      );
      await new Promise((resolve, reject) => {
        props.editProject(data, e => {
          if (e.code === 0) {
            message.success(e.msg);
            resolve();
          } else {
            reject(e.msg);
          }
        });
      });
      props.getProjectList();
      setEditVisible(false);
    } catch (errorInfo) {
      typeof errorInfo === 'string' && message.error(errorInfo);
      console.log(errorInfo);
    }
  };
  const editCancel = () => {
    setEditVisible(false);
  };
  return (
    <React.Fragment>
      <Modal
        title="修改项目"
        width="500px"
        visible={editVisible}
        onCancel={editCancel}
        onOk={editOk}
        maskClosable={false}
        okText="确认修改"
        cancelText="取消"
      >
        <Form {...layout} form={form} className="editProject">
          <Form.Item
            name={['project', 'projectName']}
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
        </Form>
      </Modal>
      <div
        id={props.id}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={`${selected} clearfix item`}
      >
        <ul className="operator">
          <Tooltip title="预览">
            <Link to={`/preview/${props.id}`}>
              <li>
                <img src={preview} alt="预览" />
              </li>
            </Link>
          </Tooltip>
          {props.status ? (
            <Tooltip title="取消发布">
              <li onClick={setOffline}>
                <img src={setOfflineIcon} alt="取消发布" />
              </li>
            </Tooltip>
          ) : (
            <Tooltip title="发布">
              <li onClick={setOnline}>
                <img src={setOnlineIcon} alt="发布" />
              </li>
            </Tooltip>
          )}
          <Tooltip title="编辑">
            <li onClick={editItem}>
              <img src={edit} alt="编辑" />
            </li>
          </Tooltip>
          <Tooltip title="删除">
            <li onClick={deleItem}>
              <img src={deleteItem} alt="删除" />
            </li>
          </Tooltip>
        </ul>
        <img className="type" src={typeA} alt="类型图标" />
        {props.projectName.length > 13 ? (
          <Tooltip placement="bottom" title={props.projectName}>
            <h2>{props.projectName}</h2>
          </Tooltip>
        ) : (
          <h2>{props.projectName}</h2>
        )}

        {props.status ? (
          <span className="status">
            <i className="online"></i>已发布
            <span onClick={CopyUrl}>
              <i className="copyUrl"></i>
              <span className="copyText">复制URL</span>
            </span>
          </span>
        ) : (
          <span className="status">
            <i className="offline"></i>未发布
          </span>
        )}
        <div className="info">
          <div className="dataSource">
            <Link to={`/dataSource/${props.id}`}>
              <span className="content">
                {props.dataSource}
                <span className="des">
                  <i></i>数据源
                </span>
              </span>
            </Link>
          </div>
          <div className="pages">
            <Link to={`/home/${props.id}`}>
              <span className="content">
                {props.pages}
                <span className="des">
                  {' '}
                  <i></i>页面
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editProject,
      deleteProject
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

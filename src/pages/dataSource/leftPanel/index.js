import React from 'react';
import SourceList from './sourceList';
import EntityRelation from './entityRelation';
import AddSourceDialog from './addSourceDialog';
import styled from 'styled-components';

const LeftPanelWrap = styled.div`
  position: relative;
  margin-right: 8px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #d9dfeb;
`;

const LeftPanelHeader = styled.div`
  padding-left: 16px;
  border-bottom: 1px solid #d9dfeb;

  .panel-header-wrap {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #0e1011;
    }

    .add-source {
      color: #2985f7;
      cursor: pointer;
      .icon-add-source {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI3M0E4MjhGNzcwOTExRUFBNDVCOTE5ODU5QTY2QUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI3M0E4MjkwNzcwOTExRUFBNDVCOTE5ODU5QTY2QUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjczQTgyOEQ3NzA5MTFFQUE0NUI5MTk4NTlBNjZBRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjczQTgyOEU3NzA5MTFFQUE0NUI5MTk4NTlBNjZBRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz65hJZkAAAAKklEQVR42mLUbP3OgAX8h9KM6BJMDCSCQaiBBcmD+DxPmQ2MIy1YAQIMAH82BcDqY/9XAAAAAElFTkSuQmCC')
          center center no-repeat;
        vertical-align: baseline;
        margin-right: 4px;
      }
    }
  }
`;

const LeftPanelContent = styled.div`
  display: flex;
  height: 100%;
`;

const LeftPanelContentL = styled.div`
  width: 220px;
  height: 100%;
`;

const LeftPanelContentR = styled.div`
  position: relative;
  display: ${props => props.display || 'none'};
  width: 440px;
  height: 100%;
  /* border-left: 1px solid #d9dfeb; */
`;

const ShowLeftPanelContentBtn = styled.div`
  position: absolute;
  background: ${props => (props.display === 'none' ? '#fff' : '#f5f5f5')};
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
    transform: ${props => (props.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)')};
  }

  &:hover {
    color: #2985f7;
    .icon-arrow {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAZklEQVQYlWNgYGBg0Gz9vkqz9Xs5AxbApNn6PY2BgSGUgYGhA5sipuvVnLMYGBgqoHwMRYwwBlSiA8qtuF7N2YmiAJciFAXYFDFhczlWNxC0Aq8jcUkyMDAwMEIDaiY2SWS7cQY1ANlRNBUadkrTAAAAAElFTkSuQmCC');
    }
  }
`;

class LeftPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
    this.showLeftPanelContent = this.showLeftPanelContent.bind(this);
  }

  showLeftPanelContent() {
    this.setState(state => ({
      display: state.display === 'none' ? 'block' : 'none'
    }));
  }

  handleChange = index => {
    this.props.onChange(index);
  };

  showAddSourceModal = () => {
    this.props.showAddSourceModal();
  };

  hideAddSourceModal = () => {
    this.props.hideAddSourceModal();
  };

  getDataSourceDetectStatus = formData => {
    this.props.getDataSourceDetectStatus(formData);
  };

  handleAddSourceModal = formData => {
    this.props.handleAddSourceModal(formData);
  };

  render() {
    const { sourceList, entityRelation: entityRelationData } = this.props.data;
    const sourceName = this.props.name;
    const display = this.state.display;
    return (
      <LeftPanelWrap>
        <LeftPanelContent>
          <LeftPanelContentL>
            <LeftPanelHeader>
              <div className="panel-header-wrap">
                <div className="title">数据源</div>
                <div className="add-source" onClick={this.showAddSourceModal}>
                  <span className="icon-add-source"></span>新增
                </div>
              </div>
            </LeftPanelHeader>
            <SourceList data={sourceList} activeId={this.props.activeId} onChange={this.handleChange} />
          </LeftPanelContentL>
          <LeftPanelContentR display={display}>
            <EntityRelation data={entityRelationData} taskFail={this.props.taskFail} sourceName={sourceName} entityloading={this.props.entityloading} />
          </LeftPanelContentR>
        </LeftPanelContent>
        <ShowLeftPanelContentBtn display={display} onClick={this.showLeftPanelContent}>
          <span>实体</span>
          <span className="icon-arrow"></span>
        </ShowLeftPanelContentBtn>
        <AddSourceDialog
          modalVisible={this.props.modalVisible}
          getDataSourceDetectStatus={this.getDataSourceDetectStatus}
          hideAddSourceModal={this.hideAddSourceModal}
          handleAddSourceModal={this.handleAddSourceModal}
          sourceNameData={this.props.sourceNameData}
          tipsShow={this.props.tipsShow}
        />
      </LeftPanelWrap>
    );
  }
}

export default LeftPanel;

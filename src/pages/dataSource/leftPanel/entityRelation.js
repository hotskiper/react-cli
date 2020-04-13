import React from 'react';
import styled from 'styled-components';

const EntityRelationWrap = styled.div`
  height: 100%;
  background-image: url('/images/dataSource/wg.png');
  background-color: #f5f5f5;

  .entity-relation-header {
    display: flex;
    height: 45px;
    font-size: 14px;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-left: 1px solid #d9dfeb;
    border-bottom: 1px solid #d9dfeb;

    .flex-item {
      align-items: center;
      .number {
        display: inline-block;
        margin: 0 4px;
        color: #fa5555;
        font-weight: bold;
      }

      &.hide {
        display: none;
      }
    }

    .source-name {
      font-size: 16px;
      font-weight: bold;
      color: #2d2f33;
    }
  }

  .entity-relation-container {
    position: relative;
    display: flex;
    padding: 16px;
    flex-wrap: wrap;
    height: calc(100% - 40px);
    overflow-y: auto;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1) inset;

    .entity-relation-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 122px;
      height: 122px;
      background: #fff;
      border: 1px solid #dde9f2;
      border-radius: 100%;
      margin: 0 8px 8px 0;

      &.hide {
        display: none;
      }

      .entity-relation-content {
        display: inline-block;
        width: 88px;
        font-size: 12px;
        color: #878d99;

        .entity-relation-table {
          font-size: 14px;
          color: #2d2f33;
          font-weight: bold;
          margin-bottom: 4px;
          .icon-entity {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: text-bottom;
            margin-right: 4px;
            background: url('/images/dataSource/icon_default.png') center center no-repeat;

            &.icon-entity-person {
              background-image: url('/images/dataSource/icon_person.png');
            }

            &.icon-entity-car {
              background-image: url('/images/dataSource/icon_car.png');
            }

            &.icon-entity-mobile {
              background-image: url('/images/dataSource/icon_mobile.png');
            }
          }
        }

        .entity-relation-info {
          margin-bottom: 4px;
        }
      }
    }

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

    .error-wrap,
    .loading-wrap {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #f5f5f5;
      color: #b4bccc;
      border-left: 1px solid #d9dfeb;

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
        margin-top: -25px;
        transform: translate(-50%, -50%);
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
  }
`;

class EntityRelation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const entityRelationData = this.props.data;
    const sourceName = this.props.sourceName;
    return (
      <EntityRelationWrap>
        <div className="entity-relation-header">
          <div className="flex-item source-name">实体关系图</div>
          <div className={this.props.entityloading ? 'flex-item hide' : 'flex-item'}>
            <span>数据源{sourceName}，共生成</span>
            <span className="number">{entityRelationData.length}</span>
            <span>个实体</span>
          </div>
        </div>
        <div className="entity-relation-container">
          {entityRelationData.map((entity, index) => {
            return (
              <div className={this.props.entityloading ? 'entity-relation-wrap hide' : 'entity-relation-wrap'} key={index}>
                <div className="entity-relation-content">
                  <div className="entity-relation-table">
                    <span className={'icon-entity icon-entity-' + entity.entityEname.toLowerCase()}></span>
                    {entity.entityCname}
                  </div>
                  <div className="entity-relation-info ellipsis" title={entity.tableName}>
                    关联表：{entity.tableName}
                  </div>
                  <div className="entity-relation-info ellipsis">数据量：{entity.rowCount}</div>
                </div>
              </div>
            );
          })}
          <div className={entityRelationData.length > 0 ? 'no-data-wrap' : 'no-data-wrap show'}>
            <div className="icon-no-data"></div>
            <div className="no-data-info">暂无实体</div>
          </div>
          <div className={this.props.entityloading ? 'loading-wrap' : 'loading-wrap hide'}>
            <div className="icon-loading-wrap">
              <div className="icon-loading"></div>
              <div className="loading-info">正在智能生成实体，请耐心等待</div>
            </div>
          </div>
          <div className={this.props.taskFail ? 'error-wrap' : 'error-wrap hide'}>
            <div className="error-page-wrap">
              <div className="icon-error"></div>
              <div className="error-info-wrap">
                <span className="error-info">任务失败</span>
              </div>
            </div>
          </div>
        </div>
      </EntityRelationWrap>
    );
  }
}

export default EntityRelation;

import React from 'react';
import styled from 'styled-components';
import {
  LeftOutlined
} from '@ant-design/icons';

const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 12px 16px;
  .ant-table thead > tr > th, .ant-table tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td {
    padding: 9px 16px;
  }
  .ant-table thead > tr > th {
    background-color: #f4f7fd;
    border-bottom: solid 2px #c5cedf;
  }
  .ant-table tbody > tr {
    &:nth-child(2n+1) {
      background-color: #f4f7fd;
    }
  }
`;

const DetailWrap = styled.div`
  border-left: solid 1px #eae8f3;
  border-top: solid 1px #eae8f3;
  &:after, &:before{
    content: ' ';
    display: table;
  }
  &:after{
    clear: both;
  }
  *zoom: 1;
`;

const FormItem = styled.div`
  display: inline-block;
  width: 25%;
  border-right: solid 1px #eae8f3;
  border-bottom: solid 1px #eae8f3;
  height: 31px;
  line-height: 31px;
  float: left;
`;

const FormItemLabel = styled.label`
  background-color: #f7f8fc;
  width: 100px;
  height: 100%;
  float: left;
  padding: 0 16px 0 12px;
  border-right: solid 1px #eae8f3;
  text-align: right;
  overflow: hidden;
`;

const FormItemContext = styled.span`
  height: 31px;
  line-height: 31px;
  padding: 0 12px;
  overflow: hidden;
  display: inline-block;
  width: calc(100% - 100px);
`;

const DetailHeader = styled.div`
  position: relative;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 16px;
  height: 16px;
  line-height: 16px;
  font-weight: bold;
  padding: 0 6px;
  margin-bottom: 16px;
  border-left: solid 3px #2985f7;
`;

const Back = styled.div`
  display: inline-block;
  position: absolute;
  right: 2px;
  &:hover {
    color: #2985f7;
  }
`;


class DetailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  handleDetailBack = () => {
    this.props.onEventsChange && this.props.onEventsChange({
      type: 'list'
    });
  }
  render() {
    const {
      columns,
      data,
      pageInfo
    } = this.props;
    console.log('数据详情', columns, data, pageInfo);
    const _columns = columns.filter(column => {
      return column.fieldName !== 'id' && column.fieldName !== 'aceTableDetail' && column.fieldName !== undefined
    })
    console.log('_columns', _columns);
    return (
      <Wrapper>
        <DetailHeader>
          <Title>{pageInfo.pageName}-数据详情</Title>
          {pageInfo.pageType === 2 ? (
            <Back onClick={this.handleDetailBack}><LeftOutlined />返回</Back>
          ) : null}
        </DetailHeader>
        <DetailWrap>
          {
            _columns.map((column) => {
              return (
                <FormItem>
                  <FormItemLabel title={column.fieldRemark || column.fieldName}>{column.fieldRemark || column.fieldName}</FormItemLabel>
                  <FormItemContext title={data && data[column.fieldName]}>{data && data[column.fieldName]}</FormItemContext>
                </FormItem>
              )
            })
          }
        </DetailWrap>
      </Wrapper>
    )
  }
}

export default DetailList;
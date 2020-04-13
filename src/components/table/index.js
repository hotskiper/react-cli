import React from 'react';
import { Table, Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

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
    a {
      color: #0099ff;
    }
  }
`;

const Title = styled.div`
  font-size: 16px;
  height: 16px;
  line-height: 16px;
  font-weight: bold;
  padding: 0 6px;
  margin-bottom: 16px;
  border-left: solid 3px #2985f7;
`;

const FormItem = styled.div`
  margin: 14px 0;
`;

const FormItemLabel = styled.label`
  display: inline-block;
  width: 80px;
  text-align: left;
  color: #a2aabb;
`;

const TableSearch = styled(Search) ``;

class UITable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      loading: false
    }
  }

  handleDetailClick = (record, index, e) => {
    e.stopPropagation();
    this.props.onEventsChange && this.props.onEventsChange({
      type: 'detail',
      data: record
    });
  }

  handleTableSearchClick = (e) => {
    e.stopPropagation();
  }

  handleTableSearch = (val, e) => {
    e.stopPropagation();
    this.setState({ loading: true });
    this.setState({
      keyword: val
    })
    this.props.onChange && this.props.onChange({ keyword: val }, () => {
      this.setState({ loading: false });
    });
  }

  handleTableChange = (pagination, filters, sorter, extra, e) => {
    console.log('handleTableChange', pagination, filters, sorter, extra, e);
    const orderMap = {
      ascend: "asc",
      descend: "desc"
    }
    this.setState({ loading: true });
    const params = {
      keyword: this.state.keyword,
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
      sortname: sorter.order ? sorter.field : null,
      sortorder: orderMap[sorter.order]
    };
    console.log('params', params);
    this.props.onChange && this.props.onChange(params, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const {
      columns = [],
      dataSource = [],
      pageInfo = {},
      pageInfoPage = {}
    } = this.props;
    const {
      pageItems: pageSize,
      totalRows: total,
      pageNo: current
    } = pageInfoPage
    columns.map(column => {
      column.key = column.fieldName;
      column.title = column.fieldRemark || column.recName || column.fieldName;
      column.dataIndex = column.fieldName;
      column.width = 150;
      column.sorter = true;
      column.ellipsis = true;
    })
    columns.push({
      key: 'aceTableDetail',
      title: '操作',
      dataIndex: 'aceTableDetail',
      width: 65,
      render: (text, record, index) => <a onClick={this.handleDetailClick.bind(this, record, index)}>详情</a>,
      fixed: 'right'
    })
    const _columns = columns.filter(column => {
      return column.key !== undefined;
    })
    console.log('页面信息', pageInfo);
    return (
      <Wrapper>
        <Title>
          {pageInfo.pageName}
        </Title>
        <FormItem>
          <FormItemLabel>关键词</FormItemLabel>
          <TableSearch
            placeholder="请输入关键词"
            onSearch={this.handleTableSearch.bind(this)}
            onClick={this.handleTableSearchClick.bind(this)}
            style={{ width: 200 }}
          />
        </FormItem>
        <Table
          key={pageInfo.id}
          columns={_columns}
          dataSource={dataSource}
          pagination={{
            pageSize: pageSize || 10,
            total,
            current
          }}
          scroll={{ x: 1200, y: 465 }}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </Wrapper>
    )
  }
}

export default UITable;
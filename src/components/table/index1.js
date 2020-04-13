import React from 'react';
import { Table } from 'antd';

class UITable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  getColumns(data = [], _key) {
    const arr = [];
    Object.keys(data).forEach((item) => {
      const keys = item.split(`${_key}.`)[1].split('.');
      if (keys.length === 1) {
        arr.push({
          key: keys[0],
          title: data[item].title,
          dataIndex: keys[0],
          attr: data[item]
        })
      }
    })
    return arr;
  }

  getValues(data, _key) {
    const rows = data[_key] || [];
    rows.forEach((row, idx) => row.key = idx);
    return rows;
  }

  getTableRows() {
    const { data = [], desc = [], _key } = this.props;
    const columns = this.getColumns(desc, _key);
    const values = this.getValues(data, _key);
    const rows = [];
    columns.forEach(item => {
      rows.push(values[0][item.key]);
    })
    return {
      columns, rows, values
    }
  }

  render() {
    const { data = [], desc = [], _key } = this.props;
    const thList = data[_key];
    const { columns, rows, values } = this.getTableRows();
    console.log('最终结果', columns, rows, values)
    return (
      <div className="ai-table">
        <Table columns={columns} dataSource={values} />
      </div>
    )
  }
}

export default UITable;
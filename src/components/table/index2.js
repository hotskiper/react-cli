import React from 'react';
import { Table } from 'antd';

class UITable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  getKeys(data, _key) {
    const arr = [];
    Object.keys(data).forEach((item) => {
      const keys = item.split(`${_key}.`)[1].split('.');
      if (keys.length === 1) {
        arr.push({
          key: keys[0],
          attr: data[item]
        })
      }
    })
    console.log('arr', arr);
    return arr;
  }

  getValues(data, _key) {
    return data[_key];
  }

  showThead(data, _key) {
    const keys = this.getKeys(data, _key);
    return (
      keys.map((item) => {
        return <th>{item.attr.title}</th>
      })
    )
  }

  showTbody(data, _key) {
    const list = this.getValues(data, _key);
    return (
      list.map(item => {
        return <td>{item}</td>
      })
    )
  }

  getTableRows() {
    const { data, desc, _key } = this.props;
    console.log('-----', data, desc, _key)
    const keys = this.getKeys(desc, _key);
    const values = this.getValues(data, _key);
    const rows = [];
    console.log(keys, values)
    keys.forEach(item => {
      rows.push(values[0][item.key]);
    })
    console.log('rows', rows);
    return {
      keys, rows
    }
  }

  render() {
    console.log('table', this.props);
    const { data, desc, _key } = this.props;
    const thList = data[_key];
    const { keys, rows } = this.getTableRows();
    console.log('最终结果', keys, rows)
    return (
      <div className="ai-person">
        <table>
          <thead>
            <tr>
              {keys.map(name => (<th>{name.attr.title}</th>))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {rows.map(row => (<td>{row}</td>))}
              {/* {keys.map(name => (<th>{rows[name]}</th>))} */}
            </tr>
          </tbody>
        </table>
        <Table />
      </div>
    )
  }
}

export default UITable;
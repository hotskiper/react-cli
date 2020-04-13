import React from 'react';
import { AutoComplete } from 'antd';
import './index.css';

class AiPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  getColumns(data, _key) {
    const arr = [];
    Object.keys(data).forEach((item) => {
      const keys = item.split(`${_key}.`)[1].split('.');
      if (keys.length === 1) {
        arr.push({
          key: keys[0],
          title: data[item].title,
          dataIndex: keys[0],
          attr: data[item],
          options: [{ value: '12' }, { value: '43' }]
        })
      }
    })
    return arr;
  }

  getValues(data, _key) {
    const rows = data[_key];
    rows.forEach((row, idx) => row.key = idx);
    return rows;
  }
  getOptions(key) {
    console.log('*********', key)
    const _key = 'ai_person';
    const { data } = this.props;
    data[_key].map(item => {
      item.value = item[key]
      console.log('二次循环内部', item, key, item[key], item.value)
    });
    console.log('data[_key]', data[_key]);
    return data[_key];
  }
  render() {
    const _key = 'ai_person';
    const { desc } = this.props;
    console.log('筛选项', desc);
    const columns = this.getColumns(desc, _key);
    return (
      <div className="ai-condition">
        {columns.map(column => {
          return (
            <div className="condition-item">
              <label>{column.title}</label>
              <AutoComplete
                key={column.key}
                // options={this.getOptions(column.key)}
                options={column.options}
                style={{
                  width: 200,
                  marginLeft: 10
                }}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default AiPerson;
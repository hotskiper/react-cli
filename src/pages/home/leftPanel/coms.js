import React from 'react';
import './coms.css';

class ComponentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  addCom = (com) => {
    console.log('添加组件', com);
    this.props.addCom(com);
  }
  addModel = (model) => {
    console.log('添加模型', model);
    // this.props.addCom({
    //   test: 'first1111'
    // })
  }
  render() {
    const { models, components } = this.props;
    console.log('左侧面板数据', models);
    return (
      <div className="components-list">
        <div className="components-group">
          <div className="components-group-title">组件库</div>
          <div className="components-group-body">
            {
              components.map((com, index) => {
                return (
                  <div key={index} onClick={this.addCom.bind(this, com)}>{com.cName}</div>
                )
              })
            }
          </div>
        </div>
        <div className="components-group">
          <div className="components-group-title">模型库</div>
          <div className="components-group-body">
            {
              models.map((model, index) => {
                return (
                  <div key={index} onClick={this.addModel.bind(this, model)}>{model.cName}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
export default ComponentsList;
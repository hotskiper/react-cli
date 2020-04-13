import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  render() {
    return (
      <div className="com-input">
        我是一个输入框<input />
      </div>
    )
  }
}

export default Input;
import React from 'react';

class ComString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  render() {
    const { name = '-', value = '-' } = this.props;
    return (
      <div className="ai-person">
        {name}：{value}
      </div>
    )
  }
}

export default ComString;
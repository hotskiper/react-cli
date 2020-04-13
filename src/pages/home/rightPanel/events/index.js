import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  background-color: #fff;
`;

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'style'
    }
  }
  render() {
    return (
      <Wrapper>
        暂不支持交互配置
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedComIds: state.home.selectedComIds,
    pages: state.home.pageList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightPanel);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  background-color: #fff;
`;

const PanelTab = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  border-bottom: solid 1px #ddd;
  font-size: 12px;
  font-weight: bold;
  background-color: #f4f4f4;
`;

const Tab = styled.span`
  margin-right: 16px;
  color: #878d99;
  cursor: pointer;
  padding: 8px 2px;
  &:hover, &.active {
    color: #0e1011;
  }
  &.active {
    border-bottom: solid 3px #0e1011;
  }
`;

const PanelBody = styled.div`
  padding: 12px;
`;

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  render() {
    const { selectedComIds, pages } = this.props;
    console.log('right-panel', this.props);
    return (
      <Wrapper>
        <PanelTab>
          <Tab className="active">属性配置</Tab>
          <Tab>交互配置</Tab>
        </PanelTab>
        <PanelBody>
          字段配置
        </PanelBody>
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

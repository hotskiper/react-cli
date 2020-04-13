import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import StylePanel from './style';
import EventsPanel from './events';

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
      activeTab: 'style'
    }
  }
  handleTabClick = (tab) => {
    this.setState({
      activeTab: tab
    });
  }
  renderConfigPanel = () => {
    const { activeTab } = this.state;
    let ConfigPanelJsx = null;
    switch (activeTab) {
      case 'style':
        ConfigPanelJsx = (
          <StylePanel />
        )
        break;
      case 'events':
        ConfigPanelJsx = (
          <EventsPanel />
        )
        break;
      default:
        break;
    }
    return ConfigPanelJsx;
  }
  render() {
    const { selectedComIds, pages } = this.props;
    const { activeTab } = this.state;
    console.log('right-panel', this.props);
    return (
      <Wrapper>
        <PanelTab>
          <Tab className={activeTab === 'style' ? 'active' : null} onClick={this.handleTabClick.bind(this, 'style')}>属性配置</Tab>
          <Tab className={activeTab === 'events' ? 'active' : null} onClick={this.handleTabClick.bind(this, 'events')}>交互配置</Tab>
        </PanelTab>
        <PanelBody>
          {this.renderConfigPanel()}
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

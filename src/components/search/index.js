import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #3a435f;
  color: #fff;
  a {
    &:hover {
      color: #fff;
    }
  }
`;
const Logo = styled.a`
  margin-right: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  padding: 0 8px;
`;

const NavBar = styled.div`
  flex: 1 0 auto;
  max-width: 450px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  handleSearch = (val) => {
    console.log('handleSearch', val);
  }
  render() {
    const { project = {}, link } = this.props;
    return (
      <Wrapper>
        <a href={link ? link : null}>
          <Logo><i></i>{project.projectName}</Logo>
        </a>
        {/* <NavBar>
          <Search
            placeholder="请输入关键字"
            enterButton="搜索"
            onSearch={this.handleSearch}
          />
        </NavBar> */}
      </Wrapper>
    )
  }
}

export default Header;
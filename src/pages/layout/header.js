import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import logo from './images/logo-blue.png';

const Wrapper = styled.div`
  height: 65px;
  color: #5a5e66;
  display: flex;
  // position: fixed;
  z-index: 9999;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  position: relative;
  border-bottom: solid 1px #e5e5e6;
  a {
    height: 64px;
    line-height: 64px;
  }
  img {
    line-height: 50px;
    padding: 0 25px;
  }
  ul {
    list-style: none;
    display: flex;
    li {
      padding: 0 25px;
      cursor: pointer;
      list-style: none;
      line-height: 65px;
      font-size: 16px;
      flex-direction: column;
      &.selected {
        background-color: #2985f7;
        font-weight: bold;
        color: #fff;
      }
    }
  }
`;

export default function Header(params) {
  return (
    <Wrapper>
      <Link to="/project/">
        <img src={logo} alt="logo" />
      </Link>
      <ul>
        <Link to="/project/">
          <li className="selected">我的项目</li>
        </Link>
        <Tooltip title='板块建设中'><li>文档</li></Tooltip>
      </ul>
    </Wrapper>
  );
}

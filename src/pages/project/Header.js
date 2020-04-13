import React, { useEffect, useRef } from 'react';
import { Tooltip } from 'antd';
import logo from './images/logo.png';

export default function Header(params) {
  const ref = useRef(null);

  const setHeaderStyle = e => {
    if (e.target.documentElement.scrollTop > 20) {
      ref.current.style.backgroundColor = '#252d47';
    } else {
      ref.current.style.backgroundColor = 'rgba(37, 45, 71, 0.12)';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setHeaderStyle);
    return () => {
      window.removeEventListener('scroll', setHeaderStyle);
    };
  }, []);

  return (
    <div className="header" ref={ref}>
      <img src={logo} alt="logo" />
      <ul>
        <li className="selected">我的项目</li>
        <Tooltip title="板块建设中">
          <li>文档</li>
        </Tooltip>
      </ul>
    </div>
  );
}

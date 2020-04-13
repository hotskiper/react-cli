import React from 'react';
import ai from './images/AI_Coding.png'

export default function Header(params) {
  return (
    <div className="banner">
      <div className="description">
        <img src={ai} alt="ai"/>
        <span>
          从数据的认知，到页面的智能构建，真正实现零代码，零门槛，零鸿沟。
        </span>
      </div>
    </div>
  );
}

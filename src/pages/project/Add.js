import React from 'react';
import add from './images/add.png';

export default params => {
  return (
    <div className="add">
      <img src={add} alt="新建项目" />
      <span>新建项目</span>
    </div>
  );
};

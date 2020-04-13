import React from 'react';
import Header from './Header';
import Banner from './Banner';
import ProjectList from './List';
import 'antd/dist/antd.css';
import './index.css';

export default function Project(props) {
  return (
    <div className="project">
      <Header />
      <Banner />
      <ProjectList />
    </div>
  );
}

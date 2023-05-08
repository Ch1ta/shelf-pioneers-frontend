import React from 'react';
import axios from 'axios';

import Navbar from './Navbar';
import Programs from './Programs';
import CreateProgram from './CreateProgram';
import CreateSession from './CreateSession';
import Polls from './Polls';
import Quiz from './Quiz';

import styles from './styles.module.scss';
import { Route, Routes, useParams } from 'react-router-dom';

const Index = () => {
  const { param } = useParams();

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div className={styles.content}>
        {param === 'active' && <CreateSession />}
        {param === 'programs' && <Programs />}
        {param === 'create' && <CreateProgram />}
        {param === 'polls' && <Polls />}
        {param === 'quiz' && <Quiz />}
        {param === 'history' && <h1>В разработке</h1>}
      </div>
    </div>
  );
};

export default Index;

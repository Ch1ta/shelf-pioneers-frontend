import React, { useState } from 'react';

import QuizList from './QuizList';
import QuizEditor from './QuizEditor';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Index = () => {
  const mode = useSelector((state) => state.quiz.mode);

  return (
    <Box
      sx={{
        minHeight: '50%',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      {mode === null ? <QuizList /> : <QuizEditor />}
    </Box>
  );
};

export default Index;

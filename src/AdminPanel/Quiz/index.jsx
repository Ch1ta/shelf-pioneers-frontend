import React, { useState } from 'react';

import QuizList from './QuizList';
import QuizEditor from './QuizEditor';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Index = () => {
  const isEditing = useSelector((state) => state.quiz.isEditing);
  const isCreating = useSelector((state) => state.quiz.isCreating);

  return (
    <Box
      sx={{
        minHeight: '50%',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      {isEditing ? <QuizEditor /> : <QuizList />}
    </Box>
  );
};

export default Index;

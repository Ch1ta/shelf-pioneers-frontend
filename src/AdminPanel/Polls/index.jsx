import React, { useState } from 'react';

import PollList from './PollList';
import PollEditor from './PollEditor';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Index = () => {
  const isEditing = useSelector((state) => state.poll.isEditing);

  return (
    <Box
      sx={{
        minHeight: '50%',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      {isEditing ? <PollEditor /> : <PollList />}
    </Box>
  );
};

export default Index;

import React from 'react';

import PollList from './PollList';
import PollEditor from './PollEditor';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Index = () => {
  const mode = useSelector((state) => state.poll.mode);

  return (
    <Box
      sx={{
        minHeight: '50%',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      {mode === null ? <PollList /> : <PollEditor />}
    </Box>
  );
};

export default Index;

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect } from 'react';
import { createSession } from '../../store/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import QRCode from 'qrcode.react';
import SessionManager from './SessionManager';
import { fetchQuiz } from '../../store/quizSlice';
import { fetchPolls } from '../../store/pollSlice';

const Index = () => {
  const dispatch = useDispatch();
  const [started, setStarted] = React.useState(false);

  const status = useSelector((state) => state.session.status);
  const link = useSelector((state) => state.session.link);

  useEffect(() => {
    dispatch(fetchQuiz());
    dispatch(fetchPolls());
  }, []);
  const handleCreateClick = () => {
    dispatch(createSession());
  };

  if (!link)
    return (
      <Button
        variant="outlined"
        sx={{ color: 'white', borderColor: 'white' }}
        onClick={handleCreateClick}
      >
        <AddIcon sx={{ marginRight: '5px' }} />
        Создать Сессию
      </Button>
    );

  return (
    <Box
      sx={{
        background: 'white',
        borderRadius: '5px',
        minHeight: '30%',
        padding: '10px',
        display: 'flex',
        gap: '50px',
      }}
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <QRCode value={link} size="300" />
          <h1>localhost:3000/{link}</h1>
        </div>
      </Box>
      <SessionManager />
    </Box>
  );
};

export default Index;

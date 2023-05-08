import React from 'react';
import QuizItem from '../../../components/QuizItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuiz,
  setIsCreating,
  setIsEditing,
} from '../../../store/admin/quizSlice';

import { Alert, Box, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Index = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.quiz.items);
  const fetchStatus = useSelector((state) => state.quiz.status);

  React.useEffect(() => {
    dispatch(fetchQuiz());
  }, []);

  const handleAddClick = () => {
    dispatch(setIsCreating(true));
    dispatch(setIsEditing(true));
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ color: 'white', borderColor: 'white' }}
        onClick={handleAddClick}
      >
        <AddIcon sx={{ marginRight: '5px' }} />
        Создать квиз
      </Button>

      {fetchStatus === 'pending' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh',
          }}
        >
          <CircularProgress sx={{ color: 'white' }} size={70} />
        </Box>
      ) : fetchStatus === 'fulfilled' ? (
        <>
          {items.map((item, index) => (
            <QuizItem {...item} />
          ))}
        </>
      ) : (
        <Alert severity="error">Ошибка</Alert>
      )}
    </div>
  );
};

export default Index;

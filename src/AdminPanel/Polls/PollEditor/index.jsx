import React from 'react';
import { Box, Button, Card, Fab, IconButton, TextField } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuestion,
  createPoll,
  removeQuestion,
  setMode,
  setQuestion,
  setTitle,
  updatePoll,
} from '../../../store/admin/pollSlice';
import { createQuiz, updateQuiz } from '../../../store/admin/quizSlice';

const PollEditor = () => {
  const dispatch = useDispatch();

  const poll = useSelector((state) => state.poll.editingItem);
  const mode = useSelector((state) => state.poll.mode);
  const handleBackwardsClick = () => {
    dispatch(setMode(null));
  };
  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };
  const handleQuestionChange = (questionIndex, newQuestion) => {
    dispatch(setQuestion({ questionIndex, newQuestion }));
  };
  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleRemoveQuestion = (questionIndex) => {
    dispatch(removeQuestion(questionIndex));
  };

  const handleSave = () => {
    if (mode === 1) {
      dispatch(createPoll());
      dispatch(setMode(2));
    }
    if (mode === 2) dispatch(updatePoll());
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          color: 'white',
          borderColor: 'white',
          marginBottom: '20px',
        }}
        onClick={handleBackwardsClick}
      >
        <ArrowBackIosIcon sx={{ marginRight: '5px' }} />
        Назад
      </Button>

      <TextField
        variant="outlined"
        style={{
          color: 'white',
        }}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        InputProps={{
          style: {
            color: 'white',
            borderColor: 'white',
          },
        }}
        label="Название опроса"
        value={poll.title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />

      {poll.questions.map((question, qIndex) => (
        <Card
          key={qIndex}
          sx={{
            marginBottom: '20px',
            paddingBottom: '20px',
          }}
        >
          <TextField
            sx={{ margin: 0, marginBottom: '10px' }}
            variant="filled"
            label={`Вопрос ${qIndex + 1}`}
            value={question}
            onChange={(event) => handleQuestionChange(qIndex, event.target.value)}
            fullWidth
            margin="normal"
          />

          <Box
            sx={{
              width: '400px',
              marginLeft: '50px',
              display: 'flex',
              justifyContent: 'center',
            }}
          ></Box>

          <Button
            sx={{ marginLeft: '20px' }}
            onClick={() => handleRemoveQuestion(qIndex)}
          >
            <DeleteIcon />
            Удалить
          </Button>
        </Card>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="standart"
          sx={{ color: 'white', borderColor: 'white' }}
          onClick={handleAddQuestion}
        >
          <AddIcon sx={{ marginRight: '5px' }} />
          Добавить вопрос
        </Button>
        <Button
          variant="outlined"
          sx={{ color: 'white', borderColor: 'white' }}
          onClick={handleSave}
        >
          <SaveIcon />
          Сохранить
        </Button>
      </Box>
    </>
  );
};

export default PollEditor;

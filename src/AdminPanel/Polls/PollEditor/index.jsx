import React from 'react';
import {
  Box,
  Button,
  Card,
  Fab,
  IconButton,
  TextField,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditing } from '../../../store/pollSlice';

const PollEditor = () => {
  const dispatch = useDispatch();

  //const isCreating = useSelector((state) => state.quiz.isCreating);
  const poll = useSelector((state) => state.poll.editingItem);

  const handleBackwardsClick = () => {
    dispatch(setIsEditing(false));
  };
  const handleTitleChange = (event) => {
    //dispatch(setTitle(event.target.value));
  };
  const handleQuestionChange = (questionIndex, newQuestion) => {
    //dispatch(setQuestion({ questionIndex, newQuestion }));
  };
  const handleAddQuestion = () => {
    //dispatch(addQuestion());
  };

  const handleRemoveQuestion = (questionIndex) => {
    //dispatch(removeQuestion(questionIndex));
  };

  const handleSave = () => {
    /*if (isCreating) {
      dispatch(createQuiz());
    } else {
      dispatch(updateQuiz());
    }*/
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
            onChange={(event) =>
              handleQuestionChange(qIndex, event.target.value)
            }
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

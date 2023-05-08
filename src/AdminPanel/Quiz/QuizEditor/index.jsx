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
import {
  addAnswer,
  addQuestion,
  createQuiz,
  removeAnswer,
  removeQuestion,
  setAnswer,
  setIsEditing,
  setQuestion,
  setTitle,
  updateQuiz,
} from '../../../store/quizSlice';

const QuizEditor = () => {
  const dispatch = useDispatch();

  const isCreating = useSelector((state) => state.quiz.isCreating);
  const quiz = useSelector((state) => state.quiz.editingItem);

  const handleBackwardsClick = () => {
    dispatch(setIsEditing(false));
  };
  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };
  const handleQuestionChange = (questionIndex, newQuestion) => {
    dispatch(setQuestion({ questionIndex, newQuestion }));
  };
  const handleAnswerChange = (
    questionIndex,
    answerIndex,
    newAnswer
  ) => {
    dispatch(setAnswer({ questionIndex, answerIndex, newAnswer }));
  };
  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };
  const handleAddAnswer = (questionIndex) => {
    dispatch(addAnswer(questionIndex));
  };
  const handleRemoveQuestion = (questionIndex) => {
    dispatch(removeQuestion(questionIndex));
  };
  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    dispatch(removeAnswer({ questionIndex, answerIndex }));
  };

  const handleSave = () => {
    if (isCreating) {
      dispatch(createQuiz());
    } else {
      dispatch(updateQuiz());
    }
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
        label="Название"
        value={quiz.title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />

      {quiz.questions.map((question, qIndex) => (
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
            value={question.question}
            onChange={(event) =>
              handleQuestionChange(qIndex, event.target.value)
            }
            fullWidth
            margin="normal"
          />

          {question.answers.map((answer, aIndex) => (
            <Box
              key={aIndex}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <TextField
                sx={{ marginLeft: '50px', width: '400px' }}
                label={`Ответ ${aIndex + 1}`}
                value={answer}
                onChange={(event) =>
                  handleAnswerChange(
                    qIndex,
                    aIndex,
                    event.target.value
                  )
                }
                margin="normal"
              />

              <IconButton
                sx={{ marginLeft: '5px' }}
                onClick={() => handleRemoveAnswer(qIndex, aIndex)}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          ))}
          <Box
            sx={{
              width: '400px',
              marginLeft: '50px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              sx={{ marginBottom: '20px' }}
              onClick={() => handleAddAnswer(qIndex)}
            >
              <AddIcon />
            </Fab>
          </Box>

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

export default QuizEditor;

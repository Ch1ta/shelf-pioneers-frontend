import React from 'react';
import {
  Box,
  Button,
  Card,
  Fab,
  FormControl,
  IconButton,
  MenuItem,
  Select,
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
  setCorrectIndex,
  setMode,
  setQuestion,
  setTitle,
  updateQuiz,
} from '../../../store/admin/quizSlice';
import Typography from '@mui/material/Typography';

const QuizEditor = () => {
  const dispatch = useDispatch();

  const quiz = useSelector((state) => state.quiz.editingItem);
  const mode = useSelector((state) => state.quiz.mode);

  const handleBackwardsClick = () => {
    dispatch(setMode(null));
  };
  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };
  const handleQuestionChange = (questionIndex, newQuestion) => {
    dispatch(setQuestion({ questionIndex, newQuestion }));
  };
  const handleAnswerChange = (questionIndex, answerIndex, newAnswer) => {
    dispatch(setAnswer({ questionIndex, answerIndex, newAnswer }));
  };

  const handleCorrectIndexChange = (questionIndex, correctIndex) => {
    dispatch(setCorrectIndex({ questionIndex, correctIndex }));
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
    if (mode === 1) {
      dispatch(createQuiz());
      dispatch(setMode(2));
    }
    if (mode === 2) dispatch(updateQuiz());
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
            onChange={(event) => handleQuestionChange(qIndex, event.target.value)}
            fullWidth
            margin="normal"
          />
          {question.answers.map((answer, aIndex) => (
            <Box key={aIndex} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                sx={{ marginLeft: '50px', width: '400px' }}
                label={`Ответ ${aIndex + 1}`}
                value={answer}
                onChange={(event) =>
                  handleAnswerChange(qIndex, aIndex, event.target.value)
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
          <Box
            sx={{
              margin: '20px 0 0 50px',
              width: 'max-content',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Typography variant="h6" sx={{ color: 'green' }}>
              Верный ответ:
            </Typography>
            <FormControl sx={{ width: '70px' }}>
              <Select
                value={question.correctIndex}
                onChange={(e) => handleCorrectIndexChange(qIndex, e.target.value)}
              >
                {question.answers.map((item, aIndex) => (
                  <MenuItem value={aIndex}>{aIndex + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{ marginRight: '20px' }}
              onClick={() => handleRemoveQuestion(qIndex)}
            >
              <DeleteIcon />
              Удалить
            </Button>
          </Box>
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

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz } from '../../../store/quizSlice';
import { fetchPolls } from '../../../store/pollSlice';
import { startEvent } from '../../../store/sessionSlice';

const Index = () => {
  const dispatch = useDispatch();

  const [type, setType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const quizItems = useSelector((state) => state.quiz.items);
  const pollItems = useSelector((state) => state.poll.items);
  const handleChangeType = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
    setSelectedItem(null);
  };
  const handleChangeItem = (event) => {
    const item = items.find(
      (item) => item.title === event.target.value
    );
    console.log(item);
    setSelectedItem(item);
  };

  const handleStart = () => {
    dispatch(startEvent({ type, id: selectedItem._id }));
  };

  let items = [];
  switch (type) {
    case 'Poll':
      items = pollItems;
      break;
    case 'Quiz':
      items = pollItems;
      break;
    case 'Game':
      items = [];
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <FormControl sx={{ width: '200px' }}>
        <InputLabel id="type-select-label">Тип</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          onChange={handleChangeType}
        >
          <MenuItem value="Poll">Опрос</MenuItem>
          <MenuItem value="Quiz">Квиз</MenuItem>
          <MenuItem value="Game">Игра</MenuItem>
        </Select>
      </FormControl>
      {type && (
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="item-select-label">Item</InputLabel>
          <Select
            labelId="item-select-label"
            id="item-select"
            value={selectedItem?.title}
            onChange={handleChangeItem}
          >
            {items.map((item, index) => (
              <MenuItem key={index} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {selectedItem && (
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{ width: '200px' }}
            variant="contained"
            color="success"
            onClick={handleStart}
          >
            Начать
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;

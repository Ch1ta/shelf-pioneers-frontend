import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEvent } from '../../../../store/admin/sessionSlice';

const Index = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [timer, setTimer] = useState(15);

  const quizItems = useSelector((state) => state.quiz.items);
  const pollItems = useSelector((state) => state.poll.items);

  const handleChangeType = (event) => {
    setType(event.target.value);
    setSelectedItem(null);
  };
  const handleChangeItem = (event) => {
    const item = items.find((item) => item.title === event.target.value);
    setSelectedItem(item);
  };

  const handleTimerChange = (event) => {
    setTimer(event.target.value);
  };

  const handleChangeTimer = (event) => {
    setTimer(event.target.value);
  };

  const handleStart = () => {
    dispatch(setCurrentEvent({ type, id: selectedItem._id, timer }));
  };

  let items = [];
  switch (type) {
    case 'Poll':
      items = pollItems;
      break;
    case 'Quiz':
      items = quizItems;
      break;
    case 'Game':
      items = [];
      break;
    default:
  }
  const timerMarks = [
    {
      value: 15,
      label: '15c',
    },
    {
      value: 30,
      label: '30c',
    },
    {
      value: 45,
      label: '45c',
    },
    {
      value: 60,
      label: '60c',
    },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
          <InputLabel id="item-select-label"></InputLabel>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p>Время на ответ</p>
            <Slider
              sx={{ width: '200px' }}
              defaultValue={15}
              marks={timerMarks}
              onChange={handleTimerChange}
              valueLabelDisplay="auto"
              step={15}
              min={15}
              max={60}
            />
          </Box>

          <Button variant="outlined" color="success" onClick={handleStart}>
            Начать
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;

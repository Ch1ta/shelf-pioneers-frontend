import React from 'react';
import axios from 'axios';

import Program from '../../components/Program';

import styles from './styles.module.scss';

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Index = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  //0 - все программы, 1 - редактировать программу, 2 - просмотр программы, 3 - создать программу
  const [mode, setMode] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'http://localhost:3001/programs'
      );
      console.log(result.data);
      setItems(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
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
    );

  if (mode === 0)
    return (
      <Box>
        <Box>
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              marginBottom: '20px',
            }}
          >
            <AddIcon sx={{ marginRight: '5px' }} />
            Создать программу
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          {items.map((item, index) => (
            <Program
              title={item.title}
              description={item.description}
              setMode={setMode}
            />
          ))}
        </Box>
      </Box>
    );

  if (mode === 1)
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper elevation={3}> paper </Paper>
      </Box>
    );

  if (mode === 3)
    return (
      <Box>
        <Button
          sx={{ color: 'white', marginBottom: '20px' }}
          onClick={() => setMode(0)}
        >
          <ArrowBackIosIcon
            sx={{ fontSize: '35px', color: 'white' }}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ margin: '0' }}
          >
            Назад
          </Typography>
        </Button>
        <Box
          sx={{
            background: 'white',
            padding: '20px',
            minHeight: '50vh',
            borderRadius: '10px',
          }}
        >
          <TextField
            id="standard-basic"
            label="Название программы"
            variant="standard"
          />
        </Box>
      </Box>
    );
};

export default Index;

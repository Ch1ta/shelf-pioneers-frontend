import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolls } from '../../../store/admin/pollSlice';

import { Alert, Box, Button, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PollItem from '../../../components/PollItem';
import { resetEditingItem, setMode } from '../../../store/admin/pollSlice';

const Index = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.poll.items);
  const fetchStatus = useSelector((state) => state.poll.status);

  React.useEffect(() => {
    dispatch(fetchPolls());
  }, []);

  const handleAddClick = () => {
    dispatch(resetEditingItem());
    dispatch(setMode(1));
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ color: 'white', borderColor: 'white' }}
        onClick={handleAddClick}
      >
        <AddIcon sx={{ marginRight: '5px' }} />
        Создать опрос
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
            <PollItem {...item} />
          ))}
        </>
      ) : (
        <Alert severity="error">Ошибка</Alert>
      )}
    </div>
  );
};

export default Index;

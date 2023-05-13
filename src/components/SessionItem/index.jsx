import React from 'react';
import { useDispatch } from 'react-redux';

import { getSession } from '../../store/admin/sessionSlice';

import { Button, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Index = ({ session, handleOpen }) => {
  const dispatch = useDispatch();
  const { link, userCount } = session;
  return (
    <Card sx={{ marginTop: '10px', maxWidth: '400px', padding: '10px' }}>
      <Typography gutterBottom variant="h5" component="div">
        Сессия {link}
      </Typography>
      <CardContent sx={{ padding: 0, paddingBottom: '10px' }}>
        <p>Участников: {userCount}</p>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => dispatch(getSession(link))}
        >
          Открыть
        </Button>
      </CardActions>
    </Card>
  );
};

export default Index;

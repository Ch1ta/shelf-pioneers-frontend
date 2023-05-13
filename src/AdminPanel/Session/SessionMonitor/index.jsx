import React from 'react';
import { Box, Button } from '@mui/material';

import QR from './QR';
import EventSelector from './EventSelector';
import EventMonitor from './EventMonitor';

import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import { closeCurrentEvent, closeSession } from '../../../store/admin/sessionSlice';

Button.propTypes = {
  sx: PropTypes.shape({
    padding: PropTypes.string,
    alignItems: PropTypes.string,
    flexDirection: PropTypes.string,
    borderRight: PropTypes.string,
    display: PropTypes.string,
    gap: PropTypes.string,
    width: PropTypes.string,
  }),
  children: PropTypes.node,
};
const Index = ({ eventId }) => {
  console.log('event ', eventId);
  const dispatch = useDispatch();

  const link = useSelector((state) => state.session.currentSession.link);
  const currentEvent = useSelector((state) => state.session.currentSession.currentEvent);

  const onCloseClick = () => {
    dispatch(closeSession(link));
  };

  return (
    <Box
      sx={{
        width: '100%',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        minHeight: '500px',
        display: 'flex',
        gap: '20px',
      }}
    >
      <Box
        sx={{
          width: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          borderRight: '1px solid',
          padding: '40px',
        }}
      >
        <div>
          <h1>Сессия: {link}</h1>
        </div>
        <QR link={link} />
        <Button variant="outlined" color="error" onClick={onCloseClick}>
          Завершить сессию
        </Button>
      </Box>

      <Box sx={{ width: '50%', paddingTop: '40px' }}>
        {currentEvent ? <EventMonitor eventId={currentEvent} /> : <EventSelector />}
      </Box>
    </Box>
  );
};

export default Index;

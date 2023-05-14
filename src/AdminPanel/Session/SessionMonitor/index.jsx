import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

import QR from './QR';

import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import { closeSession } from '../../../store/admin/sessionSlice';
import SessionService from '../../../services/SessionService';
import EventSelector from './EventSelector';
import PollMonitor from './PollMonitor';
import QuizMonitor from './QuizMonitor';

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
  const dispatch = useDispatch();

  const link = useSelector((state) => state.session.currentSession.link);
  const currentEventRef = useSelector(
    (state) => state.session.currentSession.currentEvent
  );
  const [currentEventStats, setCurrentEventStats] = useState();

  useEffect(() => {
    if (currentEventRef) {
      const getEvent = async () => {
        try {
          const result = await SessionService.getEventStats(currentEventRef);
          if (result.status === 200) {
            console.log(result);
            setCurrentEventStats(result.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      const interval = setInterval(() => {
        getEvent();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentEventRef]);

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
        {!currentEventRef && <EventSelector />}
        {currentEventRef && !currentEventStats && (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={60} />
          </Box>
        )}
        {currentEventRef && currentEventStats && (
          <>
            {currentEventStats.type === 'Quiz' && (
              <QuizMonitor eventStats={currentEventStats} />
            )}
            {currentEventStats.type === 'Poll' && (
              <PollMonitor eventStats={currentEventStats} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Index;

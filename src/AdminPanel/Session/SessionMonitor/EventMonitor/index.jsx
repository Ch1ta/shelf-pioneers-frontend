import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SessionService from '../../../../services/SessionService';
import styles from './styles.module.scss';
import usersIcon from '../../../../assets/usersIcon.png';
import { closeCurrentEvent } from '../../../../store/admin/sessionSlice';

const Index = ({ eventId }) => {
  const dispatch = useDispatch();
  const [eventStats, setEventStats] = useState();
  const link = useSelector((state) => state.session.currentSession.link);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const result = await SessionService.getEventStats(eventId);
        if (result.status === 200) {
          console.log(result);
          setEventStats(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const interval = setInterval(() => {
      getEvent();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCloseClick = () => {
    dispatch(closeCurrentEvent(link));
  };

  if (eventStats)
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <h1>
            {eventStats.type} {eventStats.title}
          </h1>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <Box sx={{ display: 'flex', marginBottom: '20px' }}>
            <img
              src={usersIcon}
              style={{ height: '24px', width: '24px', marginRight: '5px' }}
            />
            <h3>{eventStats.joinedCount}</h3>
          </Box>
        </Box>
        <Box>
          <ul>
            {eventStats.questions.map((question, index) => (
              <Box sx={{ marginBottom: '60px' }}>
                <p style={{ marginBottom: '10px', fontSize: '23px' }}>
                  {question.question}
                </p>

                <div className={styles.progress}>
                  <div
                    style={{
                      width: `${
                        question.totalAnswers > 0
                          ? (question.correctAnswers / question.totalAnswers) * 100
                          : 0
                      }%`,
                    }}
                    className={styles.progress__inner}
                  ></div>
                </div>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                >
                  <h3>
                    {question.correctAnswers}/{question.totalAnswers}
                  </h3>
                </Box>
              </Box>
            ))}
          </ul>
          <Button color="error" onClick={handleCloseClick}>
            Завершить
          </Button>
        </Box>
      </Box>
    );
};

export default Index;

import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { CircularProgress, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SessionService from '../services/SessionService';
import Quiz from './Quiz';
import Poll from './Poll';
const Index = () => {
  const navigate = useNavigate();
  const params = useParams();
  const link = params.link;

  const [isWaiting, setIsWaiting] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const getEvent = async () => {
      if (link && isWaiting) {
        try {
          const res = await SessionService.getCurrentEvent(link);

          if (res.status === 200) {
            setData(res.data);
            setIsWaiting(false);
            clearInterval(interval);
          }
        } catch (err) {
          if (err.response.status === 404) {
            clearInterval(interval);
            setError('Сессия не найдена');
            setIsWaiting(false);
            navigate('/session');
          }
        }
      }
    };
    const interval = setInterval(() => {
      getEvent();
    }, 3000);
    return () => clearInterval(interval);
  }, [link, isWaiting]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleJoinClick = () => {
    navigate(`/session/${input}`);
  };

  if (!link)
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {error && <p style={{ color: 'red' }}>Сессия не найдена</p>}
          <TextField
            label="Номер сессии"
            sx={{ marginTop: '20px' }}
            variant="outlined"
            fullWidth
            value={input}
            onChange={handleInputChange}
          />
          <button onClick={handleJoinClick}>Присоединиться</button>
        </div>
      </div>
    );

  if (link && isWaiting)
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Подождите...</h1>
          <CircularProgress size={50} />
        </div>
      </div>
    );

  console.log('type', data.type);
  if (data.type === 'Quiz') return <Quiz quiz={data} setIsWaiting={setIsWaiting} />;

  if (data.type === 'Poll') return <Poll poll={data} setIsWaiting={setIsWaiting} />;
};
export default Index;

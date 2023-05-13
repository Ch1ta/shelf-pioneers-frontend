import React, { useState } from 'react';

import styles from './styles.module.scss';
import { Box, TextField } from '@mui/material';
import EventService from '../../services/EventService';

const Index = ({ poll, setIsWaiting }) => {
  const questions = poll.questions;

  const [input, setInput] = useState('');
  const [step, setStep] = React.useState(0);
  const question = questions[step];

  const isFinished = step === questions.length;
  if (isFinished) {
    setTimeout(() => {
      setIsWaiting(true);
    }, 10000);
  }

  const handleNext = async () => {
    await EventService.setQuizAnswer({
      quizId: poll.eventId,
      index: step,
      answer: input,
    });
    setStep(step + 1);
    setInput('');
  };

  const percentage = Math.round((step / questions.length) * 100);

  if (!isFinished)
    return (
      <div className={styles.quiz1_wrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.progress}>
              <div
                style={{ width: `${percentage}%` }}
                className={styles.progress__inner}
              ></div>
            </div>

            <h2>{question}</h2>
            <br />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={handleNext}>Дальше</button>
            </Box>
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.quiz1_wrapper}>
      <div className={styles.container}>
        <div
          style={{
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1>Молодец!</h1>
          <img
            style={{ width: '40%' }}
            src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

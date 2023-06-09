import React from 'react';
import { useDispatch } from 'react-redux';
import { useWindowHeight, useWindowWidth } from '@react-hook/window-size';

import styles from './styles.module.scss';
import Confetti from 'react-confetti';
import EventService from '../../services/EventService';
import { setIsWaiting } from '../../store/user/eventSlice';

const Index = ({ quiz, setIsWaiting }) => {
  const width = useWindowWidth();
  const height = useWindowHeight();

  const questions = quiz.questions;

  const [step, setStep] = React.useState(0);

  const question = questions[step];

  const isFinished = step === questions.length;
  if (isFinished) {
    setTimeout(() => {
      setIsWaiting(true);
    }, 10000);
  }

  const percentage = Math.round((step / questions.length) * 100);

  const handleVariantClick = async (answerIndex) => {
    await EventService.setQuizAnswer({
      quizId: quiz.eventId,
      index: step,
      answer: answerIndex,
    });
    setStep(step + 1);
  };

  if (!isFinished)
    return (
      <div className={styles.quiz1_wrapper}>
        <div className={styles.container}>
          {/*<img
          src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          alt=""
        />*/}
          <div>
            <div className={styles.progress}>
              <div
                style={{ width: `${percentage}%` }}
                className={styles.progress__inner}
              ></div>
            </div>

            <h1>{question.question}</h1>
            <ul>
              {question.variants.map((item, index) => (
                <li key={index} onClick={() => handleVariantClick(index)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.quiz1_wrapper}>
      <Confetti height={height} width={width} />
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

import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

const Index = () => {
  const dispatch = useDispatch();

  const questions = [
    {
      title:
        'Каким видом транспорта лучше добираться на работу — ишаком или ослом? Читайте больше: https://www.nur.kz/leisure/entertainment/269164-samyye-smeshnyye-voprosy-na-vse-sluchai-zhizni/',
      variants: ['ишаком', 'ослом', 'игорем'],
    },
    {
      title: 'Что противоположно слову «напротив»?',
      variants: ['против', 'нанапротив', 'нананапротив'],
    },
    {
      title: 'Ты Настя?',
      variants: ['да', 'да!', 'ДА!'],
    },
  ];

  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const question = questions[step];

  const isFinished = answers.length === questions.length;
  const percentage = Math.round((step / questions.length) * 100);

  const handleVariantClick = (index) => {
    setStep(step + 1);
    setAnswers((prevAnswers) => [...prevAnswers, index]);
  };

  return (
    <div className={styles.quiz1_wrapper}>
      <div className={styles.container}>
        {/*<img
          src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          alt=""
        />*/}
        {!isFinished ? (
          <div>
            <div className={styles.progress}>
              <div
                style={{ width: `${percentage}%` }}
                className={styles.progress__inner}
              ></div>
            </div>

            <h1>{question.title}</h1>
            <ul>
              {question.variants.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleVariantClick(index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ height: '200px' }}>
            <h1>Настя, все херня, давай по новой</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

import React from 'react'
import {useDispatch} from "react-redux";
import './index.scss';

const Index = () => {
    const dispatch = useDispatch()

    const questions = [
        {
            title: 'React - это ... ?',
            variants: ['Библиотека', 'Фреймворк', 'Приложение'],
        },
        {
            title: 'Компонент - это ... ',
            variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        },
        {
            title: 'Какой тип доставки вы предпочитаете?',
            variants: [
                'Самовывоз из пункта выдачи',
                'Курьером',
                'Почтовая доставка',
            ]
        },
    ];

    const [step, setStep] = React.useState(2);
    const question = questions[step]
    const percentage = Math.round((step/questions.length)*100);

    const handleVariantClick = (index) => {
        setStep(step+1)
        console.log(percentage)
    }


    return (
        <div className="quiz1_wrapper">
            <div className="container">
                <img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt=""/>
                <div className="progress">
                    <div style={{width: `${percentage}%`}} className="progress__inner"></div>
                </div>

                <h1>{question.title}</h1>
                <ul>
                    {question.variants.map((item, index) => <li key={index} onClick = {()=>handleVariantClick(index)}>{item}</li>)}
                </ul>
            </div>
        </div>

    );
}

export default Index
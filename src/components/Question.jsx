import { useState } from 'react';

import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../questions.js'

export default function Question({index, onSelectAnswer, onSkipAnswer}) {
    //state where we wanna store an object where selectedAnswer and isCorrect property
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    //idea is to have a function handnleSelectAnswer should be trigger and  expect to get my answer text here
    // setAnswer to the new object, isCorrect must be derived after 1 sec
    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        {/*true if right answer, false if not, need to know right answer is */}
        {/*access Key to take a look for specific question, then first answer w/c correct answer then compare our answer */}
        {/* true if correct answer otherwise it is false */}
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

        {/* set timer dont move away, after 2 secs we call onSelectAnswer pass to this func trigger the connected func in Quiz Component */}
        setTimeout(() => {
            onSelectAnswer(answer);
            }, 2000);

        }, 1000);
    }

    //user answer to update the UI
    let answerState = '';
    // check answer is true and correct is not equal to null
    // be we dont wanna show the result yet
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            {/* onTimeout once timer expire, execute handleSelectAnswer but has null so add new entry, placeholder for no answer
            when func created, it is new obj in memory, everytime reevaluated*/}
            {/*QuestionTImer not change, need to be reset , add "key" bec can added to element and component, should use this key outputting data, 
            key whenever changes, react destroy and create new one*/}
            <QuestionTimer 

                timeout={10000} 
                onTimeout={onSkipAnswer}
            />
            {/*output the questions, access the active question index, then text property*/}
            <h2>{QUESTIONS[index].text}</h2>
            {/* answers = available answers in the selected questions */}
            {/* selectAnswer = value is the latest answers store to user answers */}
            {/* answerState =  answers state managing in quiz component*/}
            {/* onSelect = point to handle select answer */}
            
            <Answers 
                answers={QUESTIONS[index].answers}
                selectAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}
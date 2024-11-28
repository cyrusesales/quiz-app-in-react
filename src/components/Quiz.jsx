import { useState } from 'react';

import QUESTIONS from '../questions.js'
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
    // register the answer selected by users, want to store picked by user
    const [userAnswers, setUserAnswers] = useState([]);

    //if useState is empty array, activeQuestionIndex is zero
    const activeQuestionIndex = userAnswers.length;
    
    //make sure we cant exceed number of questions we have
    // true or false
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    //add func trigger when button is press
    function handleSelectAnswer(selectedAnswer) {
        //store the selected answer in user array
        // update the user answer state
        // update the func form, bec wanna update the state based on prev state
        setUserAnswers((prevUserAnswer) => {
            //return spread existing user answer but append prev answer
            return [...prevUserAnswer, selectedAnswer];
        });
    }

    //display diff content if quiz is over
    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    //----------only execute if we still have questions to display
     //spread questions into this array, created new array so dont edit the original answer array
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    
     //use shuffle and call built in sort, will no return new array, instead added array, creating a new copy by creating sort
     //then take a fucntion , always receive two elements from array, if negative those element will swap and if positive, they stay in the order
     // pair by pair to derive a new order
     // want to shuffle the order here,
     //Math random give us a value between 0 and 1 and with 0.5, will end up negative value in 50 or 100 cases or with the negative value
    shuffledAnswers.sort(() => Math.random() - 0.5);

    
    return (
        <div id="quiz">
            <div id="question">
                {/* onTimeout once timer expire, execute handleSelectAnswer but has null so add new entry, placeholder for no answer */}
                <QuestionTimer timeout={10000} onTimeout={() => handleSelectAnswer(null)}/>
                {/*output the questions, access the active question index, then text property*/}
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {/*output the possible answer, map list of answer to list of JSX components*/}
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            {/*
                            //output button should be selectable
                            //wrap anonymous function so we have more control over handleSelectAnswer will envoke, pass the answer here, not executed immediately
                            //custom func executed
                            */}
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}



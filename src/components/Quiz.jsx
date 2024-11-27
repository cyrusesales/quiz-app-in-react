import { useState } from 'react';

import QUESTIONS from '../questions.js'

export default function Quiz() {
    // register the answer selected by users, want to store picked by user
    const [userAnswers, setUserAnswers] = useState([]);

    //if useState is empty array, activeQuestionIndex is zero
    const activeQuestionIndex = userAnswers.length;

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

    return (
        <div id="quiz">
            <div id="question">
            {/*output the questions, access the active question index, then text property*/}
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {/*output the possible answer, map list of answer to list of JSX components*/}
                    {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
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



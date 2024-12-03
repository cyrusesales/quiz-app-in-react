import { useRef } from 'react';

export default function Answer({answers, selectedAnswer, answerState, onSelect}) {
    //to manage value will not chnage if component func execute again
    const shuffledAnswers = useRef();

    //check if shuffled answer current is undefined
    if (!shuffledAnswers.current) {
        //----------only execute if we still have questions to display
        //spread questions into this array, created new array so dont edit the original answer array
        shuffledAnswers.current = [...answers];
        
        //use shuffle and call built in sort, will no return new array, instead added array, creating a new copy by creating sort
        //then take a fucntion , always receive two elements from array, if negative those element will swap and if positive, they stay in the order
        // pair by pair to derive a new order
        // want to shuffle the order here,
        //Math random give us a value between 0 and 1 and with 0.5, will end up negative value in 50 or 100 cases or with the negative value
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {/*output the possible answer, map list of answer to list of JSX components*/}
            {shuffledAnswers.current.map((answer) => {
                    //look userAnswers.length minus 1
                    const isSelected = selectedAnswer === answer;
                    let cssClass = '';

                    //check if answerState is equal to answered, also taking look userAnswer
                    if (answerState === 'answered' && isSelected) {
                        cssClass = 'selected';
                    }

                    if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClass = answerState;
                    }

                    return (
                        <li key={answer} className="answer">
                        {/*
                        //output button should be selectable
                        //wrap anonymous function so we have more control over handleSelectAnswer will envoke, pass the answer here, not executed immediately
                        //custom func executed
                        //cant move to those questions quickly
                        //disable if answerState is not equal to empty string
                        */}
                            <button 
                                onClick={() => onSelect(answer)} 
                                className={cssClass}
                                disabled={answerState !== ''}
                            >
                                {answer}
                            </button>
                        </li>
                    );
                } 
            )}
        </ul>
    );
}
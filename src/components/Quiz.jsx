import { useState, useCallback, useRef } from 'react';

import QUESTIONS from '../questions.js'
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
    //to manage value will not chnage if component func execute again
    const shuffledAnswers = useRef();

    const [answerState, setAnswerState] = useState('');

    // register the answer selected by users, want to store picked by user
    const [userAnswers, setUserAnswers] = useState([]);

    //shuffeled answer state, initial empty array then useEffect hook gets only update when execute for first time

    //if useState is empty array, activeQuestionIndex is zero
    //make sure active question index if current answer state is empty string
    //otherwise should be equal to useranswer length minus 1 to stick with old question
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    
    //make sure we cant exceed number of questions we have
    // true or false
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    //add func trigger when button is press
    // dont have dependecy, not user state or props
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        //instead of storing answer right away, wants to change the color first the selected answer
        // change answerState to 'answered' once user did select an answer
        setAnswerState('answered');

        //store the selected answer in user array
        // update the user answer state
        // update the func form, bec wanna update the state based on prev state
        setUserAnswers((prevUserAnswer) => {
            //return spread existing user answer but append prev answer
            return [...prevUserAnswer, selectedAnswer];
        });

        //set timeout to check if selected answer is correct or wrong
        setTimeout(() => {
            //compare to the correct answer
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            //only start after this timer stopped,setAnswerState is empty string, make sure answer is reset then move on next question
            setTimeout(() => {
                setAnswerState('');
            }, 2000);

        }, 1000);
        //activeQuestionIndex should recreated whenever it changes so it add as dependency
    }, [activeQuestionIndex]);

    //happen if timer expired, useCallback need dependecy that list depedency might use
    //handleSelectAnswer depends on props and state
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    //display diff content if quiz is over
    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    //check if shuffled answer current is undefined
    if (!shuffledAnswers.current) {
        //----------only execute if we still have questions to display
        //spread questions into this array, created new array so dont edit the original answer array
        shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
        
        //use shuffle and call built in sort, will no return new array, instead added array, creating a new copy by creating sort
        //then take a fucntion , always receive two elements from array, if negative those element will swap and if positive, they stay in the order
        // pair by pair to derive a new order
        // want to shuffle the order here,
        //Math random give us a value between 0 and 1 and with 0.5, will end up negative value in 50 or 100 cases or with the negative value
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    

    
    return (
        <div id="quiz">
            <div id="question">
                {/* onTimeout once timer expire, execute handleSelectAnswer but has null so add new entry, placeholder for no answer
                when func created, it is new obj in memory, everytime reevaluated*/}
                {/*QuestionTImer not change, need to be reset , add "key" bec can added to element and component, should use this key outputting data, 
                key whenever changes, react destroy and create new one*/}
                <QuestionTimer 
                    key={activeQuestionIndex}
                    timeout={10000} 
                    onTimeout={handleSkipAnswer}
                />
                {/*output the questions, access the active question index, then text property*/}
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                
            </div>
        </div>
    );
}



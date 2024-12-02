import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() {


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

    
    

    
    return (
        <div id="quiz">
            {/* key = will force react to destroy and recreate component */}
            {/* key = use single key bec this is the entire question*/}
            <Question 
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text} 
                answers={QUESTIONS[activeQuestionIndex].answers}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}



import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() {

    // register the answer selected by users, want to store picked by user
    const [userAnswers, setUserAnswers] = useState([]);

    //shuffeled answer state, initial empty array then useEffect hook gets only update when execute for first time

    //if useState is empty array, activeQuestionIndex is zero
    //make sure active question index if current answer state is empty string
    //otherwise should be equal to useranswer length minus 1 to stick with old question
    //just base bec this will be now updated from inside Question component once login
    const activeQuestionIndex = userAnswers.length;
    
    //make sure we cant exceed number of questions we have
    // true or false
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    //add func trigger when button is press
    // dont have dependecy, not user state or props
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {

        //store the selected answer in user array
        // update the user answer state
        // update the func form, bec wanna update the state based on prev state
        setUserAnswers((prevUserAnswer) => {
            //return spread existing user answer but append prev answer
            return [...prevUserAnswer, selectedAnswer];
        });
        
    }, []);

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
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}



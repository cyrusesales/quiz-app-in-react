import { useState } from 'react';

export default function Quiz() {
    //manage the current active questions and store those answers
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    // register the answer selected by users, want to store picked by user
    const [userAnswers, setUserAnswers] = useState([]);

    return (
        //output the questions
        <p>Current active Questions</p>
    );
}



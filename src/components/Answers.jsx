export default function Answer({answers, selectAnswer, answerState}) {
    return (
        <ul id="answers">
            {/*output the possible answer, map list of answer to list of JSX components*/}
            {shuffledAnswers.current.map((answer) => {
                    //look userAnswers.length minus 1
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
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
                        */}
                            <button 
                                onClick={() => handleSelectAnswer(answer)} 
                                className={cssClass}
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
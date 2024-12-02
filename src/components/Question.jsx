import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';

export default function Question({questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}) {
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
            <h2>{questionText}</h2>
            {/* answers = available answers in the selected questions */}
            {/* selectAnswer = value is the latest answers store to user answers */}
            {/* answerState =  answers state managing in quiz component*/}
            {/* onSelect = point to handle select answer */}
            
            <Answers 

                answers={answers}
                selectAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelectAnswer}
            />
        </div>
    );
}
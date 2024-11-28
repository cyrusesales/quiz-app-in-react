import { useState, useEffect } from 'react';


export default function QuestionTimer({ timeout, onTimeout }) {
    //initial is timeout bec remaining time
    const [remainingTime, setRemainingTime] = useState();
        
    //set timer that expire after some time
    //how much time should expire
    //time is configurable
    //once time expired, want let know the parent componnet for next question
    //onTimeout should func call from inside once expired
    // add useEffect
    // need dependecy, 2 props , timeout and onTimeout
    // make sure re executed once 1 of the dependecy changes
    useEffect(() => {
        setTimeout(onTimeout, timeout);
    }, [timeout, onTimeout]);


    //to avoid infinite loop, make sure not executed all the time
    //no dependency, neither using props and state values in this effect value
    useEffect(() => {
        //update every 100 millisecs, this func should execute
        setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        });
    }, []); 


    //update the progress bar that execute code every millisecs
    return (
        <progress id="question-time" max={timeout} value={remainingTime}/>
    );
}
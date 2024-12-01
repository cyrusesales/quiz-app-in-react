import { useState, useEffect } from 'react';


export default function QuestionTimer({ timeout, onTimeout }) {
    //initial is timeout bec remaining time
    const [remainingTime, setRemainingTime] = useState(timeout);
        
    //set timer that expire after some time
    //how much time should expire
    //time is configurable
    //once time expired, want let know the parent componnet for next question
    //onTimeout should func call from inside once expired
    // add useEffect
    // need dependecy, 2 props , timeout and onTimeout
    // make sure re executed once 1 of the dependecy changes
    //execute again if dependency value change
    useEffect(() => {
        console.log('SETTING TIMEOUT');
        const timer = setTimeout(onTimeout, timeout);

        //cleanup function
        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]);


    //to avoid infinite loop, make sure not executed all the time
    //no dependency, neither using props and state values in this effect value
    useEffect(() => {
        console.log('SETTING INTERVAL');
        //update every 100 millisecs, this func should execute, less and less as time expires
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        //cleanup function
        //auto run my react before it runs again or disappear from screen
        return () => {
            clearInterval(interval);
        };
    }, []); 


    //update the progress bar that execute code every millisecs
    return (
        <progress id="question-time" max={timeout} value={remainingTime}/>
    );
}
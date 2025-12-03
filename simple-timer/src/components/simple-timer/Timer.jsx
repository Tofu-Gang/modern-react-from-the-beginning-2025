import { useState, useRef } from "react";
import Display from "./Display.jsx";
import Controls from "./Controls.jsx";

function Timer() {
    const timerRef = useRef(null);
    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false);

    function toggleTimer() {
        if(isRunning) {
            // clear the interval to stop the timer
            clearInterval(timerRef.current);
            timerRef.current = null;
        } else {
            // start the timer
            timerRef.current = setInterval(
                () => setTime((current) => current + 1),
                1000);
        }
        setRunning((current) => !current);
    }

    function resetTimer() {
        clearInterval(timerRef.current);
        setRunning(false);
        setTime(0);
        timerRef.current = null;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <Display time={time} />
            <Controls toggleTimer={toggleTimer} isRunning={isRunning} resetTimer={resetTimer}/>
        </div>
    );
}

export default Timer;

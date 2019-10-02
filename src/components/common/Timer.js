import React, {useContext} from "react";
import {Context} from "../../state/State";
import RadialCountdown from "./RadialCountdown";
import "./Timer.css";

const Timer = () => {
    const {timeLeft, testDuration} = useContext(Context);
    let time = timeLeft.toString();
    if (time.length < 2) time = "0" + time;

    return (
        <div className="Timer">
            <RadialCountdown
                radius={50}
                stroke={8}
                // strokeColor="#9dd5f4"
                percentageLeft={timeLeft / testDuration}
            />
            <span className="Timer-content">{time}</span>
        </div>
    );
};

export default Timer;

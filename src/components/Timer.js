import React, {useContext} from "react";
import {Context} from "./../state/State";
import "./Timer.css";

const Timer = () => {
    const {timeLeft} = useContext(Context);
    let time = timeLeft.toString();
    if (time.length < 2) time = "0" + time;

    return (
        <div className="Timer">
            <span>{time}</span>
        </div>
    );
};

export default Timer;

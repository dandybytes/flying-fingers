import React, {useState, useContext} from "react";
import {Context} from "./../../state/State";
import "./Intro.css";

const Intro = () => {
    const [durationChoice, setDurationChoice] = useState(60);
    const {setTestDuration} = useContext(Context);

    return (
        <div className="Intro">
            <header className="Intro-header">
                <h1>Flying Fingers</h1>
                <h3>Typing Speed Test</h3>
            </header>
            <form
                className="Intro-settings"
                onSubmit={e => {
                    e.preventDefault();
                    setTestDuration(Number(durationChoice));
                }}
            >
                <select
                    className="Intro-duration"
                    name="duration"
                    id="duration"
                    autoFocus
                    value={durationChoice}
                    onChange={e => setDurationChoice(e.target.value)}
                >
                    <option value="10">1/6 min</option>
                    <option value="60">1 min</option>
                    <option value="120">2 min</option>
                    <option value="180">3 min</option>
                    <option value="300">5 min</option>
                </select>
                <button className="Intro-submit-button" type="submit">
                    Take Test
                </button>
            </form>
        </div>
    );
};

export default Intro;

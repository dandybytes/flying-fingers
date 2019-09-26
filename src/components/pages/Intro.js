import React, {useState, useContext} from "react";
import {Context} from "../../state/State";
import Typewriter from "./../common/Typewriter";
import DropDown from "../common/DropDown";
import Button from "./../common/Button";
import {durationOptions} from "../../data/settings";
import "./Intro.css";

const Intro = () => {
    const [durationChoice, setDurationChoice] = useState(60);
    const {setTestDuration} = useContext(Context);

    return (
        <div className="Intro">
            <header className="Intro-header">
                <h1>Flying Fingers</h1>
                <h3>
                    <Typewriter phrases={["Typing Speed Test"]} />
                </h3>
            </header>
            <form
                className="Intro-settings"
                onSubmit={e => {
                    e.preventDefault();
                    setTestDuration(Number(durationChoice));
                }}
            >
                <DropDown
                    value={Number(durationChoice)}
                    options={durationOptions}
                    name="duration"
                    id="duration"
                    autoFocus
                    handleChange={e => setDurationChoice(e.target.value)}
                />
                <Button text="Take Test" type="submit" style={{marginTop: "5vh"}} />
            </form>
        </div>
    );
};

export default Intro;

import React, {useContext} from "react";
import {Context} from "../../state/State";
import Typewriter from "./../common/Typewriter";
import DropDown from "../common/DropDown";
import Button from "./../common/Button";
import {durationOptions} from "../../data/settings";
import "./Intro.css";

const Intro = () => {
    const {testDuration, setTestDuration, setCurrentPage} = useContext(Context);

    const handleDropdownSelect = e => {
        e.target.blur();
        setTestDuration(Number(e.target.value));
    };

    const handleTakeTestClick = e => setCurrentPage("test");

    return (
        <div className="Intro">
            <header className="Intro-header">
                <h1>Flying Fingers</h1>
                <h3>
                    <Typewriter phrases={["Typing Speed Test"]} />
                </h3>
            </header>

            <DropDown
                value={testDuration}
                options={durationOptions}
                name="duration"
                id="duration"
                autoFocus={testDuration <= 0}
                handleChange={handleDropdownSelect}
            />
            <Button
                className={testDuration <= 0 ? "Button Button-blocked" : "Button Button-animated"}
                disabled={testDuration <= 0}
                text={testDuration <= 0 ? "select duration to proceed" : "Take Test"}
                type="button"
                onClick={handleTakeTestClick}
                style={{marginTop: "5vh", visibility: testDuration <= 0 ? "hidden" : "visible"}}
            />
        </div>
    );
};

export default Intro;

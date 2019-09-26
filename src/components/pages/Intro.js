import React, {useContext} from "react";
import {Context} from "../../state/State";
import Typewriter from "./../common/Typewriter";
import DropDown from "../common/DropDown";
import Button from "./../common/Button";
import {durationOptions} from "../../data/settings";
import "./Intro.css";

const Intro = () => {
    const {testDuration, setTestDuration, setCurrentPage} = useContext(Context);

    return (
        <div className="Intro">
            <header className="Intro-header">
                <h1>Flying Fingers</h1>
                <h3>
                    <Typewriter phrases={["Typing Speed Test"]} />
                </h3>
            </header>

            <DropDown
                value={Number(testDuration)}
                options={durationOptions}
                name="duration"
                id="duration"
                autoFocus
                handleChange={e => setTestDuration(Number(e.target.value))}
            />
            <Button
                text="Take Test"
                type="button"
                onClick={e => setCurrentPage("test")}
                style={{marginTop: "5vh"}}
            />
        </div>
    );
};

export default Intro;

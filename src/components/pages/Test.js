import React, {useContext, useEffect} from "react";
import {useKeyDown} from "../../hooks/hooks";
import {Context} from "../../state/State";
import Timer from "../Timer";
import TextBox from "../text/TextBox";
import Keyboard from "../keyboard/Keyboard";
import "./Test.css";

function Test() {
    const {testStarted, timeLeft, initializeTextBox, setTimeLeft, handleKeyDown} = useContext(Context); //prettier-ignore

    const scrollCursorToMiddleOfTextBox = () => {
        const textBoxFrame = document.querySelector(".TextBox-Frame");
        const cursorCharacter = document.querySelector(".Character-cursor");
        textBoxFrame.scrollTop = cursorCharacter.offsetTop - textBoxFrame.offsetTop - 4 * 16;
    };

    // populate text box when component mounts
    // eslint-disable-next-line
    useEffect(() => initializeTextBox(), []);

    // create keyboard input listeners on the window object
    useKeyDown(e => {
        handleKeyDown(e.key);
        scrollCursorToMiddleOfTextBox();
    });

    // start countdown when test status set to 'started'
    useEffect(() => {
        if (testStarted) {
            const interval = setInterval(() => {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft - 1);
                } else {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
        // eslint-disable-next-line
    }, [testStarted, timeLeft]);

    return (
        <div className="Test">
            <header className="Test-header">
                {testStarted ? (
                    <h2>Flying Fingers Typing Test</h2>
                ) : (
                    <h2 className="pulsate">Start typing to begin the test</h2>
                )}
            </header>
            <Timer />
            <TextBox />
            <Keyboard />
        </div>
    );
}

export default Test;

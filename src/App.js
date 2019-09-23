import React, {useContext, useEffect} from "react";
import {useKeyDown} from "./hooks/hooks";
import {Context} from "./state/State";
import Timer from "./components/Timer";
import TextBox from "./components/TextBox";
import Keyboard from "./components/Keyboard";
import "./App.css";

function App() {
    const {testStarted, timeLeft, initializeTextBox, setTimeLeft, handleKeyDown} = useContext(
        Context
    );

    const scrollCursorToMiddleOfTextBox = () => {
        const textBoxFrame = document.querySelector(".TextBox-Frame");
        const cursorCharacter = document.querySelector(".Character-cursor");
        const offsetTextBoxFrame = textBoxFrame.offsetTop;
        const offsetCursorCharacter = cursorCharacter.offsetTop;
        textBoxFrame.scrollTop = offsetCursorCharacter - offsetTextBoxFrame - 4 * 16;
    };

    // populate text box when component mounts
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
    }, [testStarted, timeLeft]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Flying Fingers</h1>
                <h3>Typing Speed Test</h3>
            </header>
            <Timer />
            <TextBox />
            <Keyboard />
        </div>
    );
}

export default App;

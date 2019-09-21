import React, {useContext, useEffect, useRef} from "react";
import {Context} from "./state/State";
import Timer from "./components/Timer";
import Stats from "./components/Stats";
import TextBox from "./components/TextBox";
import Keyboard from "./components/Keyboard";
import "./App.css";

function App() {
    const {
        testStarted,
        testDuration,
        timeLeft,
        characterList,
        cursorIndex,
        setCursorIndex,
        initializeTextBox,
        setTimeLeft,
        setTestStarted,
        setTypedValue
    } = useContext(Context);

    const onKeyDown = e => {
        // if test already started and no time left, ignore key press
        if (testStarted && timeLeft <= 0) return;

        const keyCode = e.keyCode;
        const isBackspace = keyCode === 8;
        const isEnter = keyCode === 13;
        const isEscape = keyCode === 27;
        const isPrintableChar = keyCode >= 32 && keyCode <= 126;

        const isValidInputChar = isEnter || isPrintableChar;

        // if test hasn't started, commence test on press of printable char
        if (!testStarted && isPrintableChar) {
            setTimeLeft(testDuration);
            setTestStarted();
        }

        if (isBackspace && cursorIndex > 0) {
            setTypedValue(cursorIndex - 1, null);
            setCursorIndex(cursorIndex - 1);
        } else if (cursorIndex < characterList.length && isValidInputChar) {
            setTypedValue(cursorIndex, e.key);
            setCursorIndex(cursorIndex + 1);
        }
    };

    // populate text box when component mounts
    useEffect(() => initializeTextBox(), []);

    // create new keyboard input listeners every time the component updates
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
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

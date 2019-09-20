import React, {useContext, useEffect} from "react";
import {Context} from "./state/State";
import Stats from "./components/Stats";
import TextBox from "./components/TextBox";
import Keyboard from "./components/Keyboard";
import "./App.css";

function App() {
    const {
        characterList,
        cursorIndex,
        setCursorIndex,
        initializeTextBox,
        setTypedValue
    } = useContext(Context);

    const onKeyDown = e => {
        // console.log(e);
        const keyCode = e.keyCode;

        const isBackspace = keyCode === 8;
        const isEnter = keyCode === 13;
        const isEscape = keyCode === 27;
        const isPrintableChar = keyCode >= 32 && keyCode <= 126;

        const isValidInputChar = isEnter || isPrintableChar;

        if (isBackspace && cursorIndex > 0) {
            setTypedValue(cursorIndex - 1, null);
            setCursorIndex(cursorIndex - 1);
        } else if (cursorIndex < characterList.length && isValidInputChar) {
            setTypedValue(cursorIndex, e.key);
            setCursorIndex(cursorIndex + 1);
        }
    };

    useEffect(() => initializeTextBox(), []);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <div className="App">
            <header className="App-header">
                <h1>Flying Fingers</h1>
                <h3>Typing Speed Test</h3>
            </header>
            {/* <Stats /> */}
            <TextBox />
            <Keyboard />
        </div>
    );
}

export default App;

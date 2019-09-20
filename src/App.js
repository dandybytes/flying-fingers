import React from "react";
import Stats from "./Stats";
import TextBox from "./TextBox";
import TypingInput from "./TypingInput";
import Keyboard from "./Keyboard";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Flying Fingers</h1>
                <h3>Typing Speed Test</h3>
            </header>
            <Stats />
            <TextBox />
            <TypingInput />
            <Keyboard />
        </div>
    );
}

export default App;

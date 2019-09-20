import React, {useContext, useEffect} from "react";
import {Context} from "./state/State";
import Stats from "./components/Stats";
import TextBox from "./components/TextBox";
import Keyboard from "./components/Keyboard";
import "./App.css";

function App() {
    const {prepareText} = useContext(Context);

    useEffect(() => prepareText(), []);

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

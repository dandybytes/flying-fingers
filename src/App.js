import React, {useContext} from "react";
import {Context} from "./state/State";
import Intro from "./components/pages/Intro";
import Test from "./components/pages/Test";
import Results from "./components/pages/Results";
import "./App.css";

function App() {
    const {testStarted, testDuration, timeLeft} = useContext(Context);

    let page;
    if (testStarted && timeLeft <= 0) {
        page = <Results />;
    } else if (testDuration > 0) {
        page = <Test />;
    } else {
        page = <Intro />;
    }

    return <div className="App">{page}</div>;
}

export default App;

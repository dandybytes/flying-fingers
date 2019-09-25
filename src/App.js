import React, {useContext, useState, useEffect} from "react";
import {Context} from "./state/State";
import Intro from "./components/pages/Intro";
import Test from "./components/pages/Test";
import Results from "./components/pages/Results";
import "./App.css";

function App() {
    const {testStarted, testDuration, timeLeft, setResults} = useContext(Context);
    let [page, setPage] = useState(<Intro />);

    useEffect(() => {
        if (testStarted && timeLeft <= 0) {
            setResults();
            setPage(<Results />);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (testDuration > 0) {
            setPage(<Test />);
        }
    }, [testDuration]);

    return <div className="App">{page}</div>;
}

export default App;

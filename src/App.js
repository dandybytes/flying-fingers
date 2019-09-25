import React, {useContext, useState, useEffect} from "react";
import {Context} from "./state/State";
import VideoBackground from "./components/common/VideoBackground";
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
        // eslint-disable-next-line
    }, [timeLeft]);

    useEffect(() => {
        if (testDuration > 0) {
            setPage(<Test />);
        }
    }, [testDuration]);

    return (
        <div className="App">
            <VideoBackground />
            {page}
        </div>
    );
}

export default App;

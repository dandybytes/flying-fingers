import React, {useContext, useEffect} from "react";
// import {useKeyDown} from "../../hooks/hooks";
import {Context} from "../../state/State";
import Timer from "../Timer";
import TextBox from "../text/TextBox";
import Keyboard from "../keyboard/Keyboard";
import Button from "../common/Button";
import "./Test.css";

function Test() {
    const {
        testStarted,
        testDuration,
        timeLeft,
        setCurrentPage,
        setTestStarted,
        setTimeLeft,
        setCursorIndex,
        computeResults
    } = useContext(Context);

    // reset cursor and test status (started & time left)
    useEffect(() => {
        setTestStarted(false);
        setTimeLeft(testDuration);
        setCursorIndex(0);
    }, []);

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

    // trigger result computation when time runs out
    useEffect(() => {
        if (testStarted && timeLeft <= 0) {
            computeResults();
        }
    }, [timeLeft]);

    return (
        <div className="Test">
            <header className="Test-header">
                {testStarted ? (
                    <h2>Flying Fingers Typing Test</h2>
                ) : (
                    <h2 className="pulsate">Start typing to begin the test</h2>
                )}
            </header>
            <main>
                <Timer />
                <TextBox />
                <Keyboard />
            </main>
            <footer>
                <Button
                    text="Back to Settings"
                    type="button"
                    onClick={e => setCurrentPage("intro")}
                    style={{marginTop: "5vh"}}
                />
                {timeLeft <= 0 && (
                    <Button
                        className={
                            timeLeft <= 0 ? "Button Button-animated" : "Button Button-blocked"
                        }
                        disabled={timeLeft > 0}
                        text="See Test Results"
                        type="button"
                        onClick={e => setCurrentPage("results")}
                        style={{
                            marginTop: "5vh",
                            marginLeft: "1vw",
                            visibility: timeLeft <= 0 ? "visible" : "hidden"
                        }}
                    />
                )}
            </footer>
        </div>
    );
}

export default Test;

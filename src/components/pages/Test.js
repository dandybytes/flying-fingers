import React, {useContext, useState, useEffect, useRef} from "react";
import {useKeyDown} from "../../hooks/hooks";
import {Context} from "../../state/State";
import Timer from "../common/Timer";
import TypedCharAnimation from "./../text/TypedCharAnimation";
import TextBox from "../text/TextBox";
import Keyboard from "../keyboard/Keyboard";
import Button from "../common/Button";
import Modal from "../common/Modal";
import {isPrintableChar} from "../../utils/keyboardInputID";
import soundAlertFile from "../../sound/error.mp3";
import "./Test.css";

function Test() {
    const {
        testStarted,
        testPaused,
        testEnded,
        timeLeft,
        characterList,
        cursorIndex,
        setCurrentPage,
        setTestPaused,
        setTestEnded,
        processTextToCharList,
        setTimeLeft,
        setLastKeyPressTime,
        handleKeyDown,
        computeResults,
        resetTestData
    } = useContext(Context);

    const soundRef = useRef();

    let [showModal, setShowModal] = useState(false);
    let [mistypeAnimation, setMistypeAnimation] = useState({typedChar: "", className: ""});

    useEffect(() => {
        // reset cursor, test status, and time left when Test page mounts
        resetTestData();
        // populate text box when component mounts
        processTextToCharList();
        // eslint-disable-next-line
    }, []);

    // start countdown when test status set to 'started'
    useEffect(() => {
        if (testStarted && !testPaused && !testEnded) {
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
    }, [testStarted, testPaused, timeLeft]);

    // scroll cursor to the middle of text box every time cursor position changes
    const scrollCursorToMiddleOfTextBox = () => {
        const textBoxFrame = document.querySelector(".TextBox-Frame");
        const cursorCharacter = document.querySelector(".Character-cursor");
        if (cursorCharacter) {
            textBoxFrame.scrollTop = cursorCharacter.offsetTop - textBoxFrame.offsetTop - 4 * 16;
        }
    };

    // listen to keyboard input events
    useKeyDown(e => {
        if (e.key === "Escape" && testStarted && !testEnded) {
            setTestPaused(true);
            setShowModal(true);
        }

        handleKeyDown(e.key);
        scrollCursorToMiddleOfTextBox();

        let timeout;
        // if wrong key pressed, play error sound
        let pressedKey = e.key;
        if (pressedKey === "'") pressedKey = "’";
        if (
            isPrintableChar(pressedKey) &&
            // testStarted &&
            !testEnded &&
            !testPaused &&
            pressedKey !== characterList[cursorIndex].correctCharacter
        ) {
            soundRef.current.play();
            setMistypeAnimation({typedChar: pressedKey, className: "TypedCharAnimation expanding"});
            timeout = setTimeout(
                () => setMistypeAnimation({typedChar: pressedKey, className: "TypedCharAnimation"}),
                100
            );
        }

        return () => clearTimeout(timeout);
    });

    // trigger result computation when time runs out
    useEffect(() => {
        if (testStarted && timeLeft <= 0) {
            setTestEnded(true);
            computeResults();
        }
        // eslint-disable-next-line
    }, [timeLeft]);

    return (
        <div className="Test">
            <audio ref={soundRef}>
                <source src={soundAlertFile} type="audio/mpeg" />
            </audio>

            <TypedCharAnimation
                typedChar={mistypeAnimation.typedChar}
                className={mistypeAnimation.className}
            />

            <header className="Test-header pulsate">
                {!testStarted ? (
                    <h2>Start typing to begin the test!</h2>
                ) : timeLeft ? (
                    <h2>Press Esc to pause test</h2>
                ) : (
                    <h2>Click below to see the results</h2>
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
                    onClick={e => {
                        resetTestData();
                        setCurrentPage("intro");
                    }}
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
            {showModal && (
                <Modal showCross={false} message={""}>
                    <Button
                        text="Continue Test"
                        type="button"
                        onClick={e => {
                            setTestPaused(false);
                            setShowModal(false);
                            setLastKeyPressTime(new Date().getTime());
                        }}
                        style={{
                            color: "white",
                            backgroundColor: "green",
                            boxShadow: "0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.7)"
                        }}
                    />
                    <Button
                        text="Abort Test"
                        type="button"
                        onClick={e => {
                            resetTestData();
                            setCurrentPage("intro");
                        }}
                        style={{
                            color: "white",
                            backgroundColor: "firebrick",
                            boxShadow: "0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.7)"
                        }}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Test;

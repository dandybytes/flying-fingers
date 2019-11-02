import React, {useContext, useState, useEffect} from "react";
import {Context} from "../../state/State";
import Typewriter from "../common/Typewriter";
import DropDown from "../common/DropDown";
import Button from "../common/Button";
import Modal from '../common/Modal';
import {durationOptions} from "../../data/settings";
import "./Intro.css";

const Intro = () => {
    const {testDuration, setTestDuration, setCurrentPage} = useContext(Context);

    let [showModal, setShowModal] = useState(false);

    // display warning about test incompatibility with mobile devices
    useEffect(() => {
        const isMobileDevice = window.navigator.userAgent.match(/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
        const isSmallScreen = window.innerWidth < 500 || window.innerHeight < 750;
        if (isMobileDevice || isSmallScreen) setShowModal(true);
    }, [])

    // select test duration
    const handleDropdownSelect = e => {
        e.target.blur();
        setTestDuration(Number(e.target.value));
    };

    const handleTakeTestClick = e => setCurrentPage("test");

    return (
        <div className="Intro">
            <header className="Intro-header">
                <h1>Flying Fingers</h1>
                <h3>
                    <Typewriter phrases={["Typing Speed Test"]} />
                </h3>
            </header>

            <DropDown
                value={testDuration}
                options={durationOptions}
                name="duration"
                id="duration"
                autoFocus={testDuration <= 0}
                handleChange={handleDropdownSelect}
            />
            
            <Button
                className={testDuration <= 0 ? "Button Button-blocked" : "Button Button-animated"}
                disabled={testDuration <= 0}
                text={testDuration <= 0 ? "select duration to proceed" : "Take Test"}
                type="button"
                onClick={handleTakeTestClick}
                style={{marginTop: "5vh", visibility: testDuration <= 0 ? "hidden" : "visible"}}
            />

            {showModal && (
                <Modal showCross={false} message={""}>
                    <h1 style={{margin: "0 0 1em", color: "firebrick", fontSize: "4vmin", fontWeight: 400, letterSpacing: 0, textTransform: "none"}}>This typing test does not currently support mobile devices.</h1>
                    <Button
                        text="Got it!"
                        type="button"
                        onClick={e => setShowModal(false)}
                        style={{
                            color: "white",
                            backgroundColor: "green",
                            fontSize: "3vmin"
                        }}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Intro;

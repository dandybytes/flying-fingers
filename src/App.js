import React, {useContext, useState, useEffect} from "react";
import {Context} from "./state/State";
import VideoBackground from "./components/common/VideoBackground";
import Intro from "./components/pages/Intro";
import Test from "./components/pages/Test";
import Results from "./components/pages/Results";
import "./App.css";
import Button from "./components/common/Button";
import Modal from "./components/common/Modal";

function App() {
    const {currentPage} = useContext(Context);

    let [pageToRender, setPageToRender] = useState(<Intro />);

    let [showModal, setShowModal] = useState(false);

    // display warning about test incompatibility with mobile devices
    useEffect(() => {
        const isMobileDevice = window.navigator.userAgent.match(
            /Mobile|Phone|Android|webOS|iPad|iPod|BlackBerry/i
        );
        const isSmallScreen = window.innerWidth < 500 || window.innerHeight < 750;
        if (isMobileDevice || isSmallScreen) setShowModal(true);
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === "intro") setPageToRender(<Intro />);
        if (currentPage === "test") setPageToRender(<Test />);
        if (currentPage === "results") setPageToRender(<Results />);
    }, [currentPage]);

    return (
        <div className="App">
            <VideoBackground />
            {pageToRender}

            {showModal && (
                <Modal showCross={false} message={""}>
                    <h1
                        style={{
                            margin: "0 0 1em",
                            color: "firebrick",
                            fontSize: "4vmin",
                            fontWeight: 400,
                            letterSpacing: 0,
                            textTransform: "none"
                        }}
                    >
                        This typing test does not currently support mobile devices.
                    </h1>
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
}

export default App;

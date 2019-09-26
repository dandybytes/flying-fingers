import React, {useContext, useState, useEffect} from "react";
import {Context} from "./state/State";
import VideoBackground from "./components/common/VideoBackground";
import Intro from "./components/pages/Intro";
import Test from "./components/pages/Test";
import Results from "./components/pages/Results";
import "./App.css";

function App() {
    const {currentPage} = useContext(Context);
    let [pageToRender, setPageToRender] = useState(<Intro />);

    useEffect(() => {
        if (currentPage === "intro") setPageToRender(<Intro />);
        if (currentPage === "test") setPageToRender(<Test />);
        if (currentPage === "results") setPageToRender(<Results />);
    }, [currentPage]);

    return (
        <div className="App">
            <VideoBackground />
            {pageToRender}
        </div>
    );
}

export default App;

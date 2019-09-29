import React, {useContext} from "react";
import {Context} from "./../../state/State";
import Table from "../common/Table";
import Button from "../common/Button";
import "./Results.css";

const Results = () => {
    const {results, setCurrentPage} = useContext(Context);

    const generalResults = {
        "words per minute": results.words.wordPerMin,
        accuracy: results.chars.accuracy.toFixed(2),
        "characters per minute": results.chars.charPerMin,
        "total words typed": results.words.total
    };

    const charResults = {
        "total characters typed": results.chars.total,
        "correctly typed characters": results.chars.correct,
        "mistyped characters": results.chars.mistyped,
        "corrected characters": results.chars.corrected
    };

    const wordResults = {
        "total words typed": results.words.total,
        "correctly typed words": results.words.correct,
        "mistyped words": results.words.mistyped,
        "adjusted speed (wpm)": (results.words.wordPerMin * results.chars.accuracy).toFixed(2)
    };

    return (
        <div className="Results">
            <header className="Results-header">
                <h1>Test Results</h1>
            </header>
            <main className="Results-main">
                <Table title={"Total"} data={generalResults} />
                <Table title={"Characters"} data={charResults} />
                <Table title={"Words"} data={wordResults} />
            </main>
            <footer className="Results-footer">
                <Button
                    text="Repeat Test"
                    type="button"
                    onClick={e => setCurrentPage("test")}
                    style={{marginTop: "5vh"}}
                />
                <Button
                    text="Take New Test"
                    type="button"
                    onClick={e => setCurrentPage("intro")}
                    style={{marginTop: "5vh"}}
                />
            </footer>
        </div>
    );
};

export default Results;

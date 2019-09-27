import React, {useContext} from "react";
import {Context} from "./../../state/State";
import Table from "../common/Table";
import Button from "../common/Button";
import "./Results.css";

const Results = () => {
    const {results, setCurrentPage} = useContext(Context);
    return (
        <div className="Results">
            <header className="Results-header">
                <h1>Results Page</h1>
            </header>
            <main>
                <Table title={"Characters"} data={results.chars} />
            </main>
            <footer>
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
                    style={{marginTop: "5vh", marginLeft: "1vw"}}
                />
            </footer>
        </div>
    );
};

export default Results;

import React, {useContext} from "react";
import {Context} from "./../../state/State";
import Table from "../common/Table";
import "./Results.css";

const Results = () => {
    const {results} = useContext(Context);
    return (
        <div>
            <h1>Results Page</h1>
            <Table title={"Characters"} data={results.chars} />
        </div>
    );
};

export default Results;

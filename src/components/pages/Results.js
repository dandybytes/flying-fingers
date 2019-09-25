import React, {useContext} from "react";
import {Context} from "./../../state/State";
import CharacterTable from "./../results/CharacterTable";
import "./Results.css";

const Results = () => {
    const {results} = useContext(Context);
    return (
        <div>
            <h1>Results Page</h1>
            <CharacterTable title={"Characters"} data={results.chars} />
        </div>
    );
};

export default Results;

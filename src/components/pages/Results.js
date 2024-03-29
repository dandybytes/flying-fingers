import React, {useContext} from "react";
import {Context} from "./../../state/State";
import Table from "../common/Table";
import TabBoard from "../common/TabBoard";
import MistypesTable from "./../results/MistypesTable";
import Button from "../common/Button";
import "./Results.css";

const Results = () => {
    const {results, setCurrentPage, resetTestData} = useContext(Context);

    const generalResults = {
        "words per minute": results.words.wordPerMin,
        accuracy: `${(100 * results.chars.accuracy).toFixed(1)}%`,
        "characters per minute": results.chars.charPerMin,
        "adjusted speed (wpm)": (results.words.wordPerMin * results.chars.accuracy).toFixed(1)
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
        "adjusted speed (wpm)": (results.words.wordPerMin * results.chars.accuracy).toFixed(1)
    };

    // the results tables will always be rendered/mounted after taking at least one test...
    // however, resetting results data when retaking a test will wipe the data structures...
    // ... for fastest & slowest; so, need to validate presence of data
    const fastestChars =
        results.speed.fastestThree[2] && results.speed.fastestThree[2][1]
            ? {
                  character: "speed (chars / min)",
                  [results.speed.fastestThree[0][0]]: [results.speed.fastestThree[0][1]],
                  [results.speed.fastestThree[1][0]]: [results.speed.fastestThree[1][1]],
                  [results.speed.fastestThree[2][0]]: [results.speed.fastestThree[2][1]]
              }
            : {
                  character: "speed (chars / min)",
                  1: "NA",
                  2: "NA",
                  3: "NA"
              };

    const slowestChars =
        results.speed.slowestThree[2] && results.speed.slowestThree[2][1]
            ? {
                  character: "speed (chars / min)",
                  [results.speed.slowestThree[0][0]]: [results.speed.slowestThree[0][1]],
                  [results.speed.slowestThree[1][0]]: [results.speed.slowestThree[1][1]],
                  [results.speed.slowestThree[2][0]]: [results.speed.slowestThree[2][1]]
              }
            : {
                  character: "speed (chars / min)",
                  1: "NA",
                  2: "NA",
                  3: "NA"
              };

    const mistypeStats = results.mistypeStats.filter(x => x.mistypes > 0).slice(0, 4);

    const tabs = [
        {
            title: "Total",
            content: <Table title={"Total"} data={generalResults} />
        },
        {
            title: "Characters",
            content: <Table title={"Characters"} data={charResults} />
        },
        {
            title: "Words",
            content: <Table title={"Words"} data={wordResults} />
        },
        {
            title: "Fastest",
            content: <Table title={"Fastest Characters"} data={fastestChars} />
        },
        {
            title: "Slowest",
            content: <Table title={"Slowest Characters"} data={slowestChars} />
        },
        {
            title: "Mistyped",
            content: (
                <MistypesTable
                    caption={"Most Frequently Mistyped Characters"}
                    data={mistypeStats}
                />
            )
        }
    ];

    return (
        <div className="Results">
            <header className="Results-header">
                <h1>Test Results</h1>
            </header>
            <TabBoard tabs={tabs} />
            <main className="Results-main"></main>
            <footer className="Results-footer">
                <Button
                    text="Repeat Test"
                    type="button"
                    onClick={e => {
                        setCurrentPage("test");
                        resetTestData();
                    }}
                    style={{marginTop: "5vh"}}
                />
                <Button
                    text="Take New Test"
                    type="button"
                    onClick={e => {
                        setCurrentPage("intro");
                        resetTestData();
                    }}
                    style={{marginTop: "5vh"}}
                />
            </footer>
        </div>
    );
};

export default Results;

import React, {useContext} from "react";
import {Context} from "../../state/State";
import Word from "./Word";
import "./TextBox.css";

const TextBox = () => {
    const {wordList} = useContext(Context);

    return (
        <div className="TextBox-Frame">
            <div className="TextBox-Content">
                {wordList.map((word, index) => (
                    <Word key={`text-word-${index}`} word={word} />
                ))}
            </div>
        </div>
    );
};

export default TextBox;

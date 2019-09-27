import React, {useContext, useEffect} from "react";
import {Context} from "../../state/State";
import {useKeyDown} from "../../hooks/hooks";
import Word from "./Word";
import "./TextBox.css";
// import Character from "./Character";

const TextBox = () => {
    const {initializeTextBox, handleKeyDown} = useContext(Context);

    const scrollCursorToMiddleOfTextBox = () => {
        const textBoxFrame = document.querySelector(".TextBox-Frame");
        const cursorCharacter = document.querySelector(".Character-cursor");
        textBoxFrame.scrollTop = cursorCharacter.offsetTop - textBoxFrame.offsetTop - 4 * 16;
    };

    // populate text box when component mounts
    // eslint-disable-next-line
    useEffect(() => initializeTextBox(), []);

    // create keyboard input listeners on the window object
    useKeyDown(e => {
        handleKeyDown(e.key);
        scrollCursorToMiddleOfTextBox();
    });

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

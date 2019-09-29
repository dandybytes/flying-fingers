import React, {useContext} from "react";
import {Context} from "../../state/State";
import "./Character.css";

const Character = ({correct, typed, index}) => {
    const {cursorIndex} = useContext(Context);

    let characterClassName = "Character";
    if (index === cursorIndex) characterClassName += " Character-cursor";
    if (typed) {
        if (typed === correct) {
            characterClassName += " Character-correct";
        } else {
            characterClassName += " Character-wrong";
        }
    }

    const charSpan =
        typed && typed !== correct ? (
            <span className={characterClassName} title={`correct: ${correct}\n typed: ${typed}`}>
                {correct === "\n" ? "↵" : correct}
            </span>
        ) : (
            <span className={characterClassName}>{correct === "\n" ? "↵" : correct}</span>
        );

    return charSpan;
};

export default Character;

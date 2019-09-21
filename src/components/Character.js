import React, {useContext} from "react";
import {Context} from "./../state/State";
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

    return <span className={characterClassName}>{correct}</span>;
};

export default Character;

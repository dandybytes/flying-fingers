import React, {useContext} from "react";
import {Context} from "./../state/State";
import "./Character.css";

const Character = ({correct, typed, index}) => {
    const {cursorIndex} = useContext(Context);

    const characterClassName =
        index === cursorIndex ? "Character Character-current-cursor" : "Character";
    return <span className={characterClassName}>{correct}</span>;
};

export default Character;

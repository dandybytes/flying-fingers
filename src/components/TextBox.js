import React, {useContext} from "react";
import {Context} from "./../state/State";
import "./TextBox.css";

const TextBox = () => {
    const {chosenText} = useContext(Context);

    return (
        <div className="TextBox">
            <p>{chosenText}</p>
        </div>
    );
};

export default TextBox;

import React, {useContext} from "react";
import {Context} from "./../state/State";
import "./TextBox.css";

const TextBox = () => {
    const {text} = useContext(Context);

    return (
        <div className="TextBox">
            <p>{text}</p>
        </div>
    );
};

export default TextBox;

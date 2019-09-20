import React, {useContext} from "react";
import {Context} from "./../state/State";
import Character from "./Character";
import "./TextBox.css";

const TextBox = () => {
    const {characterList} = useContext(Context);

    return (
        <div className="TextBox">
            {characterList.map((char, index) => (
                <Character
                    key={`text-char-${index}`}
                    index={index}
                    correct={char.correctCharacter}
                    typed={char.typedCharacter}
                />
            ))}
        </div>
    );
};

export default TextBox;

import React, {useContext, useState, useEffect} from "react";
import {Context} from "../../state/State";
import {keys} from "../../data/keys";
import Key from "./Key";
import "./Keyboard.css";
import {isLeftShiftValue, isRightShiftValue} from "../../utils/keyboardInputID";

const Keyboard = () => {
    const {cursorIndex, characterList} = useContext(Context);

    let [activeKeys, setActiveKeys] = useState([]);

    useEffect(() => {
        if (characterList.length > 0) {
            let nextCharacter = characterList[cursorIndex].correctCharacter;
            if (nextCharacter === "\n") nextCharacter = "enter";
            if (nextCharacter === "’") nextCharacter = "'";
            let newActiveKeys = [nextCharacter];
            if (isLeftShiftValue(nextCharacter)) newActiveKeys.push("leftShift");
            if (isRightShiftValue(nextCharacter)) newActiveKeys.push("rightShift");
            setActiveKeys(newActiveKeys);
        }
    }, [characterList, cursorIndex]);

    return (
        <div className="Keyboard">
            {keys.map(k => (
                <Key
                    key={`key-${k.id}`}
                    {...k}
                    className={
                        activeKeys.includes(k.value) || activeKeys.includes(k.valueShift)
                            ? "Key Key-marked"
                            : "Key Key-regular"
                    }
                />
            ))}
        </div>
    );
};

export default Keyboard;

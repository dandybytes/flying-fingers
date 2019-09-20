import React from "react";
import "./Keyboard.css";
import {keys} from "./keys";
import Key from "./Key";

const Keyboard = () => {
    return (
        <div className="Keyboard">
            {keys.map(k => (
                <Key key={`key-${k.id}`} {...k} />
            ))}
        </div>
    );
};

export default Keyboard;

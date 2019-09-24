import React, {useContext} from "react";
import {Context} from "../../state/State";
import Word from "./Word";
import "./TextBox.css";
// import Character from "./Character";

const TextBox = () => {
    // const {characterList} = useContext(Context);

    // return (
    //     <div className="TextBox-Frame">
    //         <div className="TextBox-Content">
    //             {characterList.map(char => (
    //                 <Character
    //                     key={`text-char-${char.charIndex}`}
    //                     index={char.charIndex}
    //                     correct={char.correctCharacter}
    //                     typed={char.typedCharacter}
    //                 />
    //             ))}
    //         </div>
    //     </div>
    // );

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

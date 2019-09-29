import React, {Fragment, useContext} from "react";
import {Context} from "../../state/State";
import Character from "./Character";
import "./Word.css";

const Word = ({word}) => {
    const {characterList} = useContext(Context);

    return (
        <span className="Word">
            {word.charList.map(characterIndex =>
                characterList[characterIndex].correctCharacter === "\n" ? (
                    <Fragment key={`text-char-${characterIndex}`}>
                        <Character
                            // key={`text-char-${characterIndex}`}
                            index={characterIndex}
                            correct={characterList[characterIndex].correctCharacter}
                            typed={characterList[characterIndex].typedCharacter}
                        />
                        <br />
                    </Fragment>
                ) : (
                    <Character
                        key={`text-char-${characterIndex}`}
                        index={characterIndex}
                        correct={characterList[characterIndex].correctCharacter}
                        typed={characterList[characterIndex].typedCharacter}
                    />
                )
            )}
        </span>
    );
};

export default Word;

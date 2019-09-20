import React, {createContext, useReducer} from "react";
import reducer from "./reducer";
import {text} from "./../data/text";

export const Context = createContext();

const State = props => {
    const initialState = {characterList: [], cursorIndex: 0};

    const [state, dispatch] = useReducer(reducer, initialState);

    const prepareText = () => {
        const characterList = text.split("").map(char => ({
            correctCharacter: char,
            typedCharacter: null,
            mistypes: {total: 0, charsTypedInstead: {}}
        }));
        dispatch({type: "set_character_list", characterList});
    };

    const resetCursorIndex = () => dispatch({type: "set_cursor_index", index: 0});

    const initializeTextBox = () => {
        prepareText();
        resetCursorIndex();
    };

    return (
        <Context.Provider
            value={{
                characterList: state.characterList,
                cursorIndex: state.cursorIndex,
                initializeTextBox
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default State;

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

    const setTypedValue = (index, inputValue) =>
        dispatch({type: "set_typed_value", index, inputValue});

    const setCursorIndex = index => dispatch({type: "set_cursor_index", index});

    const initializeTextBox = () => {
        prepareText();
        setCursorIndex(0);
    };

    return (
        <Context.Provider
            value={{
                characterList: state.characterList,
                cursorIndex: state.cursorIndex,
                initializeTextBox,
                setCursorIndex,
                setTypedValue
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default State;

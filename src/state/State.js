import React, {createContext, useReducer} from "react";
import reducer from "./reducer";
import {text} from "./../data/text";

export const Context = createContext();

const State = props => {
    const initialState = {
        testStarted: false,
        testDuration: 30,
        timeLeft: 10,
        characterList: [],
        cursorIndex: 0
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const prepareText = () => {
        const characterList = text.split("").map(char => ({
            correctCharacter: char,
            typedCharacter: null,
            mistypes: {total: 0, charsTypedInstead: {}}
        }));
        dispatch({type: "set_character_list", characterList});
    };

    const setCursorIndex = index => dispatch({type: "set_cursor_index", index});

    const initializeTextBox = () => {
        prepareText();
        setCursorIndex(0);
    };

    const setTimeLeft = time => dispatch({type: "set_time_left", timeLeft: time});

    const handleKeyDown = key => dispatch({type: "handle_key_down", key});

    return (
        <Context.Provider
            value={{
                testStarted: state.testStarted,
                testDuration: state.testDuration,
                timeLeft: state.timeLeft,
                characterList: state.characterList,
                cursorIndex: state.cursorIndex,
                initializeTextBox,
                setTimeLeft,
                setCursorIndex,
                handleKeyDown
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default State;

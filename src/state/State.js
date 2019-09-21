import React, {createContext, useReducer} from "react";
import reducer from "./reducer";
import {text} from "./../data/text";

export const Context = createContext();

const State = props => {
    const initialState = {
        testStarted: false,
        testDuration: 60,
        timeLeft: 60,
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

    const setTypedValue = (index, inputValue) =>
        dispatch({type: "set_typed_value", index, inputValue});

    const setTimeLeft = time => dispatch({type: "set_time_left", timeLeft: time});

    const setTestStarted = () => dispatch({type: "set_test_started"});

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
                setTestStarted,
                setCursorIndex,
                setTypedValue
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default State;

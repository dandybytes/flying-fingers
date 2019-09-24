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
        wordList: [],
        cursorIndex: 0
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const processText = () => {
        // split entire text into a list of characters...
        // ... and create an object for each character
        const characterList = text.split("").map((char, index) => ({
            charIndex: index,
            correctCharacter: char,
            typedCharacter: null,
            mistypes: {total: 0, charsTypedInstead: {}}
        }));
        dispatch({type: "set_character_list", characterList});

        // the word list array will consist of subarrays, each subarray...
        // ... comprising a list of indexes of the characters contained...
        // ... rather than the actual character objects
        const wordList = [];
        let currentWord = [];
        characterList.forEach(char => {
            currentWord.push(char.charIndex);
            if (char.correctCharacter === " ") {
                wordList.push(currentWord);
                currentWord = [];
            }
        });
        dispatch({type: "set_word_list", wordList});
    };

    const setCursorIndex = index => dispatch({type: "set_cursor_index", index});

    const initializeTextBox = () => {
        processText();
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
                wordList: state.wordList,
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

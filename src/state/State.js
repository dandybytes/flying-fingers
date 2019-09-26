import React, {createContext, useReducer} from "react";
import reducer from "./reducer";
import {text} from "./../data/text";

export const Context = createContext();

const State = props => {
    const initialState = {
        currentPage: "intro",
        testStarted: false,
        testDuration: 10,
        timeLeft: 0,
        characterList: [],
        wordList: [],
        cursorIndex: 0,
        results: {
            chars: {
                total: 0,
                correct: 0,
                mistyped: 0,
                corrected: 0,
                charPerMin: 0
            },
            words: {
                total: 0,
                correct: 0,
                mistyped: 0,
                wordPerMin: 0
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setCurrentPage = page => dispatch({type: "set_current_page", page});

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

    const setTestDuration = duration =>
        dispatch({type: "set_test_duration", testDuration: duration});

    const setTimeLeft = time => dispatch({type: "set_time_left", timeLeft: time});

    const handleKeyDown = key => dispatch({type: "handle_key_down", key});

    const setResults = () => dispatch({type: "set_results"});

    return (
        <Context.Provider
            value={{
                currentPage: state.currentPage,
                testStarted: state.testStarted,
                testDuration: state.testDuration,
                timeLeft: state.timeLeft,
                characterList: state.characterList,
                wordList: state.wordList,
                cursorIndex: state.cursorIndex,
                results: state.results,
                setCurrentPage,
                initializeTextBox,
                setTestDuration,
                setTimeLeft,
                setCursorIndex,
                handleKeyDown,
                setResults
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default State;

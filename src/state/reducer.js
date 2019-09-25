import {isPrintableChar, isBackspace, isValidInputChar} from "../utils/keyboardInputID";

export default (state, action) => {
    var {testStarted, testDuration, timeLeft, cursorIndex, characterList} = state;
    var newState = {};
    switch (action.type) {
        case "set_time_left":
            return {...state, timeLeft: action.timeLeft};

        case "set_test_duration":
            return {...state, testDuration: action.testDuration};

        case "set_character_list":
            return {...state, characterList: action.characterList};

        case "set_word_list":
            return {...state, wordList: action.wordList};

        case "set_cursor_index":
            return {...state, cursorIndex: action.index};

        case "set_results":
            // let newState = {};
            const totalChars = cursorIndex;
            let correctChars = 0;
            let correctedChars = 0;
            let mistypes = 0;

            for (let char of characterList) {
                if (char.typedCharacter === null) {
                    break;
                } else if (char.mistypes.total > 0) {
                    mistypes++;
                    if (char.typedCharacter === char.correctCharacter) correctedChars++;
                } else if (char.typedCharacter === char.correctCharacter) {
                    correctChars++;
                }
            }

            const charPerMin = (60 * totalChars) / testDuration;

            newState = {...state};
            newState.results.chars = {
                total: totalChars,
                correct: correctChars,
                mistyped: mistypes,
                corrected: correctedChars,
                charPerMin
            };

            return newState;

        case "handle_key_down":
            // {testStarted, timeLeft, testDuration, cursorIndex, characterList} = state;
            let key = action.key;

            // if test already started and no time left, ignore keystroke
            if (testStarted && timeLeft <= 0) return state;

            newState = {...state};
            let newCharacterList = [...state.characterList];
            let newCursorIndex = cursorIndex;

            // if test hasn't started, commence test on press of printable char
            if (!testStarted && isPrintableChar(key)) {
                newState = {...newState, timeLeft: testDuration};
                newState = {...newState, testStarted: true};
            }

            // on backspace move cursor to previous element and clear typed value of prev el.
            if (isBackspace(key) && cursorIndex > 0) {
                newCursorIndex = cursorIndex - 1;
                newCharacterList[newCursorIndex].typedCharacter = null;
            }

            // when printable key pressed...
            if (cursorIndex < characterList.length && isValidInputChar(key)) {
                // ...if the key is "enter", replace saved value with newline
                if (key === "Enter") key = "\n";
                newCharacterList[cursorIndex].typedCharacter = key;
                // ...if the entered char doesn't match the expected char, record it as mistype
                if (key !== newCharacterList[cursorIndex].correctCharacter) {
                    const mistypes = newCharacterList[cursorIndex].mistypes;
                    mistypes.total = mistypes.total + 1;
                    const mistakes = mistypes.charsTypedInstead;
                    if (!(key in mistakes)) {
                        mistakes[key] = 1;
                    } else {
                        mistakes[key] = mistakes[key] + 1;
                    }
                }

                newCursorIndex = cursorIndex + 1;
            }

            return {...newState, cursorIndex: newCursorIndex, characterList: newCharacterList};

        default:
            return state;
    }
};

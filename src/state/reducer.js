import {isPrintableChar, isBackspace, isValidInputChar} from "../utils/keyboardInputID";

const setTypedValue = (index, value) => {};

export default (state, action) => {
    switch (action.type) {
        case "set_time_left":
            return {...state, timeLeft: action.timeLeft};

        case "set_character_list":
            return {...state, characterList: action.characterList};

        case "set_cursor_index":
            return {...state, cursorIndex: action.index};

        case "handle_key_down":
            const {testStarted, timeLeft, testDuration, cursorIndex, characterList} = state;
            let key = action.key;

            // if test already started and no time left, ignore key press
            if (testStarted && timeLeft <= 0) return state;

            let newState = {...state};
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

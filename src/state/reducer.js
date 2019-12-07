import {isPrintableChar, isBackspace, isValidInputChar} from "../utils/keyboardInputID";
import {
    calcCharResults,
    calcWordResults,
    calcSpeedResults,
    calcMistypeStats
} from "../utils/computeResults";

const initialResults = {
    chars: {
        total: 0,
        correct: 0,
        mistyped: 0,
        corrected: 0,
        charPerMin: 0,
        accuracy: 0
    },
    words: {
        total: 0,
        correct: 0,
        mistyped: 0,
        wordPerMin: 0
    },
    speed: {
        speedArr: [].slice(),
        fastestThree: [].slice(),
        slowestThree: [].slice()
    },
    mistypeStats: [].slice()
};

export default (state, action) => {
    var {
        testStarted,
        testPaused,
        testEnded,
        testDuration,
        timeLeft,
        cursorIndex,
        characterList,
        wordList,
        lastKeyPressTime,
        typedCharInventory
    } = state;
    var newState = {};

    switch (action.type) {
        case "set_current_page":
            return {...state, currentPage: action.page};

        case "set_test_started":
            return {...state, testStarted: action.testStarted};

        case "set_test_paused":
            return {...state, testPaused: action.testPaused};

        case "set_test_ended":
            return {...state, testEnded: action.testEnded};

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

        case "set_last_keypress_time":
            return {...state, lastKeyPressTime: action.time};

        case "reset_test_data":
            return {
                ...state,
                testStarted: false,
                testPaused: false,
                testEnded: false,
                timeLeft: testDuration,
                lastKeyPressTime: null,
                cursorIndex: 0,
                typedCharInventory: {},
                results: {...initialResults}
            };

        case "compute_results":
            newState = {...state};
            newState.results.chars = calcCharResults(cursorIndex, characterList, testDuration);
            newState.results.words = calcWordResults(
                wordList,
                cursorIndex,
                characterList,
                testDuration
            );
            newState.results.speed = calcSpeedResults(typedCharInventory);
            newState.results.mistypeStats = calcMistypeStats(typedCharInventory);

            return newState;

        case "handle_key_down":
            // record the time of the current keystroke
            let newKeyPressTime, timeDifference;

            let key = action.key;

            // if test paused or ended, ignore keystrokes
            if (testPaused || testEnded || timeLeft <= 0) return state;

            newState = {...state};
            let newCharacterList = [...state.characterList];
            let newCursorIndex = cursorIndex;
            let newTypedCharInventory = {...state.typedCharInventory};

            // if test hasn't started, commence test on press of printable char
            if (!testStarted && isPrintableChar(key)) {
                newState.timeLeft = testDuration;
                newState.testStarted = true;
            }

            // on backspace move cursor to previous element and clear typed value of prev el.
            if (isBackspace(key) && cursorIndex > 0) {
                newCursorIndex = cursorIndex - 1;
                newCharacterList[newCursorIndex].typedCharacter = null;
                newKeyPressTime = new Date().getTime();
            }

            // when printable key pressed...
            if (cursorIndex < characterList.length && isValidInputChar(key)) {
                // ...record time of printable keystroke
                newKeyPressTime = new Date().getTime();
                // ... compute time span since last key press
                timeDifference = lastKeyPressTime ? newKeyPressTime - lastKeyPressTime : null;
                // ...if the key is "enter", replace saved value with newline
                if (key === "Enter") key = "\n";
                // ...if they key is single quotation mark, replace
                if (key === "'") key = "’";
                // save the typed key in the current cursor character object
                newCharacterList[cursorIndex].typedCharacter = key;

                const correctChar = characterList[cursorIndex].correctCharacter;
                // if the correct char value at the current cursor location already registerd in inventory
                if (newTypedCharInventory[correctChar]) {
                    // ...add current cursor index to its list of occurrences
                    newTypedCharInventory[correctChar].occurrences.push(cursorIndex); //prettier-ignore
                    if (timeDifference) newTypedCharInventory[correctChar].speed.push(timeDifference); //prettier-ignore
                } else {
                    // ...otherwise, register the correct char in inventory
                    newTypedCharInventory[correctChar] = {
                        occurrences: [{cursorIndex, time: newKeyPressTime, charTyped: key}],
                        mistypes: [],
                        speed: timeDifference ? [timeDifference] : []
                    };
                }

                // ...if the entered char doesn't match the expected value
                if (key !== newCharacterList[cursorIndex].correctCharacter) {
                    // ...add entered char to array of mistypes at current cursor location
                    newCharacterList[cursorIndex].mistypes.push(key);
                    // ...and add the mistype to the inventory under correct (expected) character
                    newTypedCharInventory[correctChar].mistypes.push({
                        charListIndex: cursorIndex,
                        charTypedInstead: key
                    });
                }

                newCursorIndex =
                    cursorIndex < characterList.length - 1 ? cursorIndex + 1 : cursorIndex;
            }

            newState.cursorIndex = newCursorIndex;
            newState.characterList = newCharacterList;
            newState.typedCharInventory = newTypedCharInventory;

            // update last key press time only when printable key or backspace pressed
            if (isPrintableChar(key) || isBackspace(key))
                newState.lastKeyPressTime = newKeyPressTime ? newKeyPressTime : null;

            return newState;

        default:
            return state;
    }
};

import {isPrintableChar, isBackspace, isValidInputChar} from "../utils/keyboardInputID";

export default (state, action) => {
    var {
        testStarted,
        testPaused,
        testEnded,
        testDuration,
        timeLeft,
        cursorIndex,
        characterList,
        wordList
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

        case "compute_results":
            const calcCharResults = () => {
                // let newState = {};
                const totalChars = cursorIndex;
                let correctChars = 0;
                let correctedChars = 0;
                let mistypes = 0;

                // eslint-disable-next-line
                for (let char of characterList) {
                    // stop computing results as soon as a character with no user-input value is encountered
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

                return {
                    total: totalChars,
                    correct: correctChars,
                    mistyped: mistypes,
                    corrected: correctedChars,
                    charPerMin,
                    accuracy: correctChars / totalChars
                };
            };

            const calcWordResults = () => {
                let indexOfLastWord = 0;
                for (let i = 0, len = wordList.length; i < len; i++) {
                    // check if last recorded cursor index found among characters of current word
                    if (wordList[i].charList.includes(cursorIndex)) {
                        // if word typed in full, register as last typed word
                        if (cursorIndex === wordList[i].charList.length - 1) {
                            indexOfLastWord = i;
                        } else {
                            // if word only partially typed, set previous word as last
                            indexOfLastWord = i - 1;
                        }
                        break;
                    }
                }

                let mistypedWords = 0;
                // iterate through all the fully typed words
                for (let wordInd = 0; wordInd <= indexOfLastWord; wordInd++) {
                    // calculate length of word and reduce it by one to discount for the included space
                    // currently not dismissing non-alphanumeric chars (e.g. comma or period at the end)
                    let len = wordList[wordInd].charList.length - 1;
                    // iterate through characters the given word comprises
                    for (let indexOfCharInWord = 0; indexOfCharInWord < len; indexOfCharInWord++) {
                        let analysedChar =
                            characterList[wordList[wordInd].charList[indexOfCharInWord]];
                        // if one of the chars in word mistyped, increase mistype counter by 1 and move to next word
                        if (analysedChar.correctCharacter !== analysedChar.typedCharacter) {
                            mistypedWords++;
                            break;
                        }
                    }
                }

                const totalWords = indexOfLastWord + 1;

                return {
                    total: totalWords,
                    correct: totalWords - mistypedWords,
                    mistyped: mistypedWords,
                    wordPerMin: (60 * totalWords) / testDuration
                };
            };

            newState = {...state};
            newState.results.chars = calcCharResults();
            newState.results.words = calcWordResults();

            return newState;

        case "handle_key_down":
            let key = action.key;

            // if test paused or ended, ignore keystrokes
            if (testPaused || testEnded || timeLeft <= 0) return state;

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

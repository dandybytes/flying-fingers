import {isPrintableChar, isBackspace, isValidInputChar} from "../utils/keyboardInputID";

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
            const calcCharResults = () => {
                // let newState = {};
                const totalChars = cursorIndex;
                let correctChars = 0;
                let correctedChars = 0;
                let mistyped = 0;

                // eslint-disable-next-line
                for (let char of characterList) {
                    // stop computing results as soon as a character with no user-input value is encountered
                    if (char.typedCharacter === null) {
                        break;
                    } else if (char.mistypes.length > 0) {
                        mistyped++;
                        if (char.typedCharacter === char.correctCharacter) correctedChars++;
                    } else if (char.typedCharacter === char.correctCharacter) {
                        correctChars++;
                    }
                }

                const charPerMin = (60 * totalChars) / testDuration;

                return {
                    total: totalChars,
                    correct: correctChars,
                    mistyped,
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

            const calcSpeedResults = () => {
                let fastestThree = [],
                    slowestThree = [];
                // calc avarage val of arr by reducing arr items to sum and dividing by length
                const averageOfArr = arr => arr.reduce((a, n) => a + n, 0) / arr.length;

                const speedArr = Object.keys(typedCharInventory)
                    // filter out null elements of speed array
                    // then filter out speed arrays with no valid elements
                    .filter(
                        char =>
                            typedCharInventory[char].speed.filter(s => typeof s === "number")
                                .length > 0
                    )
                    // return array of subarrays containing 2 elements ([char, averageCharSpeed])
                    .map(char => [`_${char}_`, averageOfArr(typedCharInventory[char].speed)])
                    // sort in order of ascending average speed value
                    .sort((a, b) => a[1] - b[1]);

                // iterate through first 3 items of speedArr, which is sorted by speed in ascending order
                for (let i = 0; i < 3; i++) {
                    fastestThree.push(
                        speedArr[i]
                            ? // num of ms in min (60 * 1000) divided by speed in ms = chars / min
                              [speedArr[i][0], ((60 * 1000) / speedArr[i][1]).toFixed(2)]
                            : // if not enough values in speedArr, return empty strings to fill table cells
                              ["NA", "NA"]
                    );
                }

                // iterate through last 3 items of speedArr, which is sorted by speed in ascending order
                for (let i = speedArr.length - 1; i > speedArr.length - 4; i--) {
                    slowestThree.push(
                        speedArr[i]
                            ? // num of ms in min (60 * 1000) divided by speed in ms = chars / min
                              [speedArr[i][0], ((60 * 1000) / speedArr[i][1]).toFixed(2)]
                            : // if not enough values in speedArr, return empty strings to fill table cells
                              ["NA", "NA"]
                    );
                }

                return {speedArr, fastestThree, slowestThree};
            };

            const calcMistypeStats = () => {
                const mistypeArr = Object.keys(typedCharInventory)
                    // --> [{char: 'a', mistypes: 1, mistypeIncidence: 0.5, charsTypedInstead: {s: 1}}]
                    .map(char => {
                        const charsTypedInsteadDictionary = typedCharInventory[
                            char
                        ].mistypes.reduce((acc, mistype) => {
                            if (acc[mistype.charTypedInstead]) {
                                acc[mistype.charTypedInstead] = acc[mistype.charTypedInstead] + 1;
                            } else {
                                acc[mistype.charTypedInstead] = 1;
                            }
                            return acc;
                        }, {});

                        const charsTypedInstead = Object.keys(charsTypedInsteadDictionary)
                            .map(char => ({
                                char: `_${char}_`,
                                incidence: charsTypedInsteadDictionary[char]
                            }))
                            .sort((a, b) => b.incidence - a.incidence)
                            // .map(charObj => `${charObj.char}(x${charObj.incidence})`)
                            .map(charObj => `${charObj.char}`)
                            .join(" ");

                        return {
                            char: `_${char}_`,
                            mistypes: typedCharInventory[char].mistypes.length,
                            mistypeIncidence:
                                typedCharInventory[char].mistypes.length /
                                typedCharInventory[char].occurrences.length,
                            // reduce arr of mistypes to frequency object: {d: 3, b: 1}
                            charsTypedInstead
                        };
                    })
                    // sort mistypeArray in order of descending mistype frequency
                    .sort((a, b) =>
                        // if mistype incidence same, sort by total num of mistypes
                        // otherwise, sort by mistype incidence
                        b.mistypeIncidence - a.mistypeIncidence === 0
                            ? b.mistypes - a.mistypes
                            : b.mistypeIncidence - a.mistypeIncidence
                    );

                return mistypeArr;
            };

            newState = {...state};
            newState.results.chars = calcCharResults();
            newState.results.words = calcWordResults();
            newState.results.speed = calcSpeedResults();
            newState.results.mistypeStats = calcMistypeStats();

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

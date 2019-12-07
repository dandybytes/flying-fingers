export const calcCharResults = (cursorIndex, characterList, testDuration) => {
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

export const calcWordResults = (wordList, cursorIndex, characterList, testDuration) => {
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
            let analysedChar = characterList[wordList[wordInd].charList[indexOfCharInWord]];
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

export const calcSpeedResults = typedCharInventory => {
    let fastestThree = [],
        slowestThree = [];
    // calc avarage val of arr by reducing arr items to sum and dividing by length
    const averageOfArr = arr => arr.reduce((a, n) => a + n, 0) / arr.length;

    const speedArr = Object.keys(typedCharInventory)
        // filter out null elements of speed array
        // then filter out speed arrays with no valid elements
        .filter(
            char => typedCharInventory[char].speed.filter(s => typeof s === "number").length > 0
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

export const calcMistypeStats = typedCharInventory => {
    const mistypeArr = Object.keys(typedCharInventory)
        // --> [{char: 'a', mistypes: 1, mistypeIncidence: 0.5, charsTypedInstead: {s: 1}}]
        .map(char => {
            const charsTypedInsteadDictionary = typedCharInventory[char].mistypes.reduce(
                (acc, mistype) => {
                    if (acc[mistype.charTypedInstead]) {
                        acc[mistype.charTypedInstead] = acc[mistype.charTypedInstead] + 1;
                    } else {
                        acc[mistype.charTypedInstead] = 1;
                    }
                    return acc;
                },
                {}
            );

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

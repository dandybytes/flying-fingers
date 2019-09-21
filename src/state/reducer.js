export default (state, action) => {
    switch (action.type) {
        case "set_test_started":
            return {...state, testStarted: true};

        case "reset_test":
            return {...state, testStarted: false, timeLeft: state.testDuration};

        case "set_time_left":
            return {...state, timeLeft: action.timeLeft};

        case "set_character_list":
            return {...state, characterList: action.characterList};

        case "set_cursor_index":
            return {...state, cursorIndex: action.index};

        case "set_typed_value":
            const characterList = state.characterList.map((char, ind) => {
                if (ind !== action.index) return char;

                let charOutput = {...char, typedCharacter: action.inputValue};
                if (action.inputValue === null) return charOutput;

                if (action.inputValue !== char.correctCharacter) {
                    charOutput.mistypes.total = charOutput.mistypes.total + 1;
                    const mistakes = charOutput.mistypes.charsTypedInstead;
                    if (!(action.inputValue in mistakes)) {
                        mistakes[action.inputValue] = 1;
                    } else {
                        mistakes[action.inputValue] = mistakes[action.inputValue] + 1;
                    }
                }

                return charOutput;
            });

            return {...state, characterList};

        default:
            return state;
    }
};

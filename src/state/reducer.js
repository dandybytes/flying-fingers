export default (state, action) => {
    switch (action.type) {
        case "set_character_list":
            const {characterList} = action;
            return {...state, characterList};
        default:
            return state;
    }
};

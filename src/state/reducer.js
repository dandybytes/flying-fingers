export default (state, action) => {
    switch (action.type) {
        case "set_character_list":
            const {characterList} = action;
            return {...state, characterList};
        case "set_cursor_index":
            return {...state, cursorIndex: action.index};
        default:
            return state;
    }
};

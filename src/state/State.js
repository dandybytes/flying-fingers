import React, {createContext, useReducer} from "react";
import reducer from "./reducer";
import {text} from "./../data/text";

export const Context = createContext();

const State = props => {
    const initialState = {characterList: []};

    const [state, dispatch] = useReducer(reducer, initialState);

    const prepareText = () => {
        const characterList = text.split("").map(char => ({
            correctCharacter: char,
            typedCharacter: null,
            mistypes: {total: 0, charsTypedInstead: {}}
        }));
        dispatch({type: "set_character_list", characterList});
    };

    return (
        <Context.Provider value={{characterList: state.characterList, prepareText}}>
            {props.children}
        </Context.Provider>
    );
};

export default State;

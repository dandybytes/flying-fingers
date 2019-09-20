import React, {createContext, useReducer} from "react";
import reducer from "./reducer";
import {text} from "./../data/text";

export const Context = createContext();

const State = props => {
    const initialState = {text};

    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{...state}}>{props.children}</Context.Provider>;
};

export default State;

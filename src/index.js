import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import State from "./state/State";
import App from "./App";

ReactDOM.render(
    <State>
        <App />
    </State>,
    document.getElementById("root")
);

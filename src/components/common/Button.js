import React from "react";
import PropTypes from "prop-types";
import {colorPalette} from "../../data/styles";
import "./Button.css";

const Button = ({text, className, type, style}) => {
    return (
        <button className={className} type={type} style={style}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object
};

Button.defaultProps = {
    text: "Click Me!",
    className: "Button",
    type: "text",
    style: {
        backgroundColor: colorPalette.color1,
        color: colorPalette.color3
    }
};

export default Button;

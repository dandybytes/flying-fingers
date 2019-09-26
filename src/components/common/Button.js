import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({text, onClick, className, type, style}) => {
    return (
        <button onClick={onClick} className={className} type={type} style={style}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object
};

Button.defaultProps = {
    text: "Click Me!",
    onClick: () => console.log("button clicked"),
    className: "Button",
    type: "button"
};

export default Button;

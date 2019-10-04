import React from "react";
import PropTypes from "prop-types";
import "./TypedCharAnimation.css";

const TypedCharAnimation = ({typedChar, className}) => {
    return <span className={className}>{typedChar}</span>;
};

TypedCharAnimation.propTypes = {
    typedChar: PropTypes.string.isRequired,
    className: PropTypes.string
};

TypedCharAnimation.defaultProps = {
    typedChar: "",
    className: "TypedCharAnimation"
};

export default TypedCharAnimation;

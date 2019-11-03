import React from "react";
import PropTypes from "prop-types";
import "./Key.css";

const Key = ({id, className, type, value, valueShift, width}) => {
    return type === "double" ? (
        <div className={className} style={{width: `${width}vw`}}>
            <span>{valueShift}</span>
            <span>{value}</span>
        </div>
    ) : (
        <div className={className} style={{width: `${width}vw`, fontSize: "1.125vw"}}>
            <span>{valueShift}</span>
        </div>
    );
};

Key.propTypes = {
    // id: PropTypes.number.isRequired,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    valueShift: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

Key.defaultProps = {
    // id: `${new Date()}${parseInt(Math.random() * 1000000)}`,
    className: "Key",
    type: "single",
    // value: "",
    // valueShift: "",
    width: "1"
};

export default Key;

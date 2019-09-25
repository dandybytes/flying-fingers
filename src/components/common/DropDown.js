import React from "react";
import PropTypes from "prop-types";
import "./DropDown.css";

const DropDown = ({value, options, handleChange, className}) => {
    return (
        <select value={value} onChange={handleChange} className={className}>
            {options.map((opt, ind) => (
                <option key={`select-opt-${ind}`} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

DropDown.propTypes = {
    value: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

DropDown.defaultProps = {
    value: 1,
    options: [
        {value: 1, label: "option 1"},
        {value: 2, label: "option 2"},
        {value: 3, label: "option 3"}
    ],
    handleChange: () => console.error("ERROR: handleChange function not defined for DropDown!"),
    className: "DropDown"
};

export default DropDown;

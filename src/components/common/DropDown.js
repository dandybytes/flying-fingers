import React from "react";
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

export default DropDown;

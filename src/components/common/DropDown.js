import React, {useState} from "react";
import PropTypes from "prop-types";
import "./DropDown.css";

const DropDown = ({name, value, options, handleChange, autoFocus, required, className}) => {
    let [selectedValue, setSelectedValue] = useState(value);

    return (
        <select
            name={name}
            value={selectedValue}
            onChange={e => {
                setSelectedValue(e.target.value);
                handleChange(e);
            }}
            className={className}
            autoFocus={autoFocus}
            required={required}
        >
            {options.map((opt, ind) => (
                <option key={`select-opt-${ind}`} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

DropDown.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool
};

DropDown.defaultProps = {
    className: "DropDown",
    value: 1,
    options: [
        {value: 1, label: "option 1"},
        {value: 2, label: "option 2"},
        {value: 3, label: "option 3"}
    ],
    handleChange: () => console.error("ERROR: handleChange function not defined for DropDown!")
};

export default DropDown;

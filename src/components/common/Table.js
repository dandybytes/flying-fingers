import React from "react";
import PropTypes from "prop-types";
import "./Table.css";

const Table = ({title, data, className}) => {
    return (
        <table className={className}>
            <thead>
                <tr>
                    <th colSpan="2">{title}</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map((key, index) => (
                    <tr key={`table-row-${index}`}>
                        <th>{key}</th>
                        <td>{data[key]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

Table.defaultProps = {
    title: "Table Title",
    data: {row1: "value 1", row2: "value 2"},
    className: "Table",
    style: {}
};

export default Table;

import React from "react";
import PropTypes from "prop-types";
import "./Table.css";

const Table = ({title, data, className}) => {
    return (
        <table className={className}>
            <thead className={`${className}-thead`}>
                <tr className={`${className}-tr`}>
                    <th colSpan="2" className={`${className}-th`}>
                        {title}
                    </th>
                </tr>
            </thead>
            <tbody className={`${className}-tbody`}>
                {Object.keys(data).map((key, index) => (
                    <tr key={`table-row-${index}`} className={`${className}-tr`}>
                        <th className={`${className}-th`}>{key}</th>
                        <td className={`${className}-td`}>{data[key]}</td>
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

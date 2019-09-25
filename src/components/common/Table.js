import React from "react";
import "./Table.css";

const Table = ({title, data}) => {
    return (
        <table>
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

export default Table;

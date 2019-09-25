import React from "react";
import "./CharacterTable.css";

const CharacterTable = ({title, data}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="2">{title}</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map(key => (
                    <tr>
                        <th>{key}</th>
                        <td>{data[key]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CharacterTable;

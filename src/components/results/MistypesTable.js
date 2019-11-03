import React from "react";
import PropTypes from "prop-types";
import "./MistypesTable.css";

const MistypesTable = ({caption, data, className}) => {
    return (
        <React.Fragment>
            {data.length > 0 ? (
                <table className={className}>
                    <caption>{caption}</caption>
                    <thead>
                        <tr>
                            <th>character</th>
                            <td>mistypes</td>
                            <td>inaccuracy rate</td>
                            <td>frequently typed instead</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={`table-row-${index}`}>
                                <th>{item.char}</th>
                                <td>{item.mistypes}</td>
                                <td>{`${(100 * item.mistypeIncidence).toFixed(1)}%`}</td>
                                <td>{item.charsTypedInstead}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>no characters were mistyped</p>
            )}
        </React.Fragment>
    );
};

MistypesTable.propTypes = {
    caption: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

MistypesTable.defaultProps = {
    caption: "table caption placeholder",
    className: "MistypesTable",
    style: {}
};

export default MistypesTable;

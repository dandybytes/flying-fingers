import React from "react";
import "./Key.css";

const Key = ({id, type, value, valueShift, width}) => {
    return type === "double" ? (
        <div className="Key" style={{width: `${width}vw`}}>
            <span>{valueShift}</span>
            <span>{value}</span>
        </div>
    ) : (
        <div className="Key" style={{width: `${width}vw`, fontSize: "1.125vw"}}>
            <span>{valueShift}</span>
        </div>
    );
};

export default Key;

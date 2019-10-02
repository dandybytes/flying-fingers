import React from "react";
import PropTypes from "prop-types";
import "./RadialCountdown.css";

const RadialCountdown = ({radius, stroke, percentageLeft, className}) => {
    const internalRadius = radius - stroke / 3;
    const circumference = 2 * Math.PI * internalRadius;

    return (
        <svg className={className} height={2 * radius} width={2 * radius}>
            <circle
                className={`${className}-circle`}
                // transition from light blue (rgb(157, 213, 244)) to purple (rgb(112, 92, 168))
                // stroke={`rgb(${Math.floor((157 - 112) * percentageLeft + 112)},${Math.floor(
                //     (213 - 92) * percentageLeft + 92
                // )},${Math.floor((224 - 168) * percentageLeft + 168)})`}
                stroke={"#9dd5f4"}
                fill="transparent"
                strokeWidth={stroke}
                cy={radius}
                cx={radius}
                r={internalRadius}
                // breaks the circle stroke into dashes and gaps
                strokeDasharray={`${circumference} ${circumference}`}
                // shifts the stroke dashes by certain amount
                strokeDashoffset={circumference * (1 - percentageLeft)}
            />
            <circle
                className={`${className}-circle`}
                stroke={"rgba(0, 0, 0, 0.1)"}
                fill="transparent"
                strokeWidth={stroke}
                cy={radius}
                cx={radius}
                r={internalRadius}
            />
        </svg>
    );
};

RadialCountdown.propTypes = {
    radius: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    percentageLeft: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

RadialCountdown.defaultProps = {
    radius: 10,
    stroke: 10,
    percentageLeft: 0,
    className: "RadialCountdown"
};

export default RadialCountdown;

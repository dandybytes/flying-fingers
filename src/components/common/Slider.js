import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {Context} from "../../state/State";
import Table from "../common/Table";
import "./Slider.css";

const Slider = ({slides}) => {
    const {results} = useContext(Context);
    let [slideNumber, setSlideNumber] = useState(1);

    const handleClick = e => console.log("arrow clicked");

    const generalResults = {
        "words per minute": results.words.wordPerMin,
        accuracy: results.chars.accuracy.toFixed(2),
        "characters per minute": results.chars.charPerMin,
        "adjusted speed (wpm)": (results.words.wordPerMin * results.chars.accuracy).toFixed(2)
    };

    return (
        <div className="Slider">
            <i id="Slider-back" className="Slider-arrow arrow-back" onClick={handleClick}></i>
            <i id="Slider-forward" className="Slider-arrow arrow-forward" onClick={handleClick}></i>

            <Table title={"Total"} data={generalResults} />
        </div>
    );
};

Slider.propTypes = {
    slides: PropTypes.array.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

Slider.defaultProps = {
    slides: ["slide 1", "slide 2"],
    className: "Slider"
};

export default Slider;

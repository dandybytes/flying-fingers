import React, {useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Context} from "../../state/State";
import Table from "./Table";
import "./Carousel.css";

const Carousel = ({slides, intervalBetweenSlides, className}) => {
    let [currentSlide, setCurrentSlide] = useState(0);
    let [timeoutInterval, setTimeoutInterval] = useState(intervalBetweenSlides);

    useEffect(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        const timeout = setTimeout(() => setCurrentSlide(nextSlide), timeoutInterval);
        return () => clearTimeout(timeout);
    }, [currentSlide, timeoutInterval]);

    const activateSlide = slideNum =>
        setCurrentSlide(
            slideNum === slides.length ? 0 : slideNum === -1 ? slides.length - 1 : slideNum
        );

    return (
        <div
            className={className}
            // when mouse hovered over carousel, timeout set to 1 day
            // this allows the user to virtually stop the slide show
            onMouseEnter={e => setTimeoutInterval(1000 * 60 * 60 * 24)}
            // removing mouse pointer from carousel reverts to regular slide show interval
            onMouseLeave={e => setTimeoutInterval(intervalBetweenSlides)}
        >
            <div
                id="Carousel-back"
                className="Carousel-arrow arrow-back"
                onClick={e => activateSlide(currentSlide - 1)}
            ></div>
            <div
                id="Carousel-forward"
                className="Carousel-arrow arrow-forward"
                onClick={e => activateSlide(currentSlide + 1)}
            ></div>

            <div className="Carousel-content">{slides[currentSlide]}</div>

            <ul className="Carousel-slide-pointers">
                {slides.map((slide, index) => (
                    <li key={`slide-pointer-${index}`}>
                        <div
                            className={
                                index === currentSlide
                                    ? "Carousel-pointer Carousel-pointer-active"
                                    : "Carousel-pointer"
                            }
                            onClick={e => activateSlide(index)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

Carousel.propTypes = {
    slides: PropTypes.array.isRequired,
    intervalBetweenSlides: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object
};

Carousel.defaultProps = {
    slides: ["slide 1", "slide 2"],
    intervalBetweenSlides: 3000,
    className: "Carousel"
};

export default Carousel;

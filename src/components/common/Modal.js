import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({visible, showCross, message, children}) => {
    return (
        <div className="Modal-backdrop">
            <div className="Modal-content">
                <span className="Modal-close" style={{display: showCross ? "block" : "none"}}>
                    &times;
                </span>
                {message && <h2 className="Modal-title">{message}</h2>}
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    // visible: PropTypes.bool.isRequired,
    showCross: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

Modal.defaultProps = {
    // visible: false,
    showCross: true,
    message: "Are you sure?",
    className: "Modal"
};

export default Modal;

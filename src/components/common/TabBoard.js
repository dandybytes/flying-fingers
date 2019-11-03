import React from "react";
import PropTypes from "prop-types";
import "./TabBoard.css";

const TabBoard = ({tabs}) => {
    return (
        <div className="tab-board">
            {tabs.map((tab, ind) => (
                <React.Fragment key={ind}>
                    <input
                        type="radio"
                        name="tab"
                        id={`tab-nav-${ind + 1}`}
                        hidden
                        className="tab-selector-input"
                        defaultChecked={ind === 0}
                    />
                    <label htmlFor={`tab-nav-${ind + 1}`} className="tab-title-label">
                        {tab.title}
                        <div className="tab-content">{tab.content}</div>
                    </label>
                </React.Fragment>
            ))}
        </div>
    );
};

TabBoard.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element]))
    ).isRequired
};

TabBoard.defaultProps = {
    // tabs: [
    //     {title: "title1", content: {headline: "headline 1", text: "content text 1"}},
    //     {title: "title2", content: {headline: "headline 2", text: "content text 2"}},
    //     {title: "title3", content: {headline: "headline 3", text: "content text 3"}}
    // ]
};

export default TabBoard;

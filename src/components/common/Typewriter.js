import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./Typewriter.css";

const Typewriter = ({phrases, typingInterval}) => {
    const initialState = {
        // text made visible to the user by this component
        displayedText: "",
        // index of the phrase (out of array of phrases) currently being typed/deleted
        phraseIndex: 0,
        // switch between typing and deletion phase for the current phrase
        isDeleting: false,
        // delay before the next character will be typed
        typingDelay: typingInterval.regular
    };

    let [state, setState] = useState(initialState);

    const typeNextCharacter = () => {
        let {displayedText, phraseIndex, isDeleting, typingDelay} = state;

        // index of current phrase
        const currentPhraseIndex = phraseIndex % phrases.length;
        // get complete text of current phrase
        const currentPhraseText = phrases[currentPhraseIndex];

        if (isDeleting) {
            // if in deletion phase, shorten visible text by one character
            displayedText = currentPhraseText.substring(0, displayedText.length - 1);
        } else {
            // otherwise, extend the visible text by one character of the current phrase
            displayedText = currentPhraseText.substring(0, displayedText.length + 1);
        }

        // set the standard delay before the next character is typed
        typingDelay = typingInterval.regular;

        // reduce typing delay in half during deletion phase
        if (isDeleting) typingDelay /= 2;

        // if the phrase has been completed & not in deletion phase
        if (displayedText === currentPhraseText && !isDeleting) {
            // make a long pause before switching to deletion
            typingDelay = typingInterval.long;
            // ...and switch to phrase deletion phase
            isDeleting = true;
        }

        // if at the end of the deletion phase
        if (displayedText === "" && isDeleting) {
            // switch from deletion back to typing phase
            isDeleting = false;
            // ...and move the index to the next phrase to be typed
            phraseIndex = phraseIndex + 1;
            // make a brief pause before starting typing
            typingDelay = typingInterval.extended;
        }

        setState({displayedText, phraseIndex, isDeleting, typingDelay});
    };

    // trigger typeNextCharacter() after specified delay whenever Typewriter component updates...
    // ...and remove timeout when Typewriter unmounts
    useEffect(() => {
        const timeoutID = setTimeout(() => typeNextCharacter(), state.typingDelay);

        return () => clearTimeout(timeoutID);
    });

    return <span className="Typewriter">{state.displayedText}</span>;
};

Typewriter.propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    typingInterval: PropTypes.object
};

Typewriter.defaultProps = {
    phrases: ["phrase one", "phrase two"],
    typingInterval: {regular: 150, extended: 400, long: 3000}
};

export default Typewriter;

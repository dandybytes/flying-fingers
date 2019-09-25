import {useEffect} from "react";

// custom hook to add a custom event listener to the window object
export const useWindowEvent = (event, callback) => {
    useEffect(() => {
        window.addEventListener(event, callback);
        return () => {
            window.removeEventListener(event, callback);
        };
        // eslint-disable-next-line
    }, [callback]);
};

// custom hook that adds a 'keydown' event listener to the window object
export const useKeyDown = callback => useWindowEvent("keydown", callback);

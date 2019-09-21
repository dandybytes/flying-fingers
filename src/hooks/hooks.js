import {useEffect} from "react";
import {getExactTime} from "./../utils/time";

export const useWindowEvent = (event, callback) => {
    useEffect(() => {
        window.addEventListener(event, callback);
        return () => {
            console.log(getExactTime(), `removing ${event} event listener`);
            console.log("");
            window.removeEventListener(event, callback);
        };
    }, [callback]);
};

export const useKeyDown = callback => useWindowEvent("keydown", callback);

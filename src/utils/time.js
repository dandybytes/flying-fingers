export const getExactTime = () => {
    const now = new Date();
    let minutes = now.getMinutes().toString();
    minutes = minutes.length === 2 ? minutes : "0" + minutes;
    let seconds = now.getSeconds().toString();
    seconds = seconds.length === 2 ? seconds : "0" + seconds;
    let milliseconds = now.getMilliseconds().toString();
    milliseconds = milliseconds.length === 2 ? milliseconds : "0" + milliseconds;
    return `${minutes}:${seconds}:${milliseconds}`;
};

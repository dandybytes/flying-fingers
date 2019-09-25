import React from "react";
import "./VideoBackground.css";

const VideoBackground = () => {
    return (
        <video id="VideoBackground" muted loop autoPlay>
            <source src="vid/typing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoBackground;

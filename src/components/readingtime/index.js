import React from "react";

import { ReadingTimeContainer, Time } from "./elements";

const ReadingTime = ({ minutes }) => {
    const minutesRoundedUp =
        minutes < 5 ? Math.ceil(minutes) : Math.ceil(minutes / 5) * 5;

    return (
        <ReadingTimeContainer>
            <span aria-label="Reading time" role="img">
                📖
            </span>
            <Time>{minutesRoundedUp} minute read</Time>
        </ReadingTimeContainer>
    );
};

export default ReadingTime;

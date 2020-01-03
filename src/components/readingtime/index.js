import React from "react";

import * as styles from "./styles";

const ReadingTime = ({ minutes }) => {
    const minutesRoundedUp =
        minutes < 5 ? Math.ceil(minutes) : Math.ceil(minutes / 5) * 5;

    return (
        <small css={styles.readingTime}>
            <span aria-label="Reading time" role="img">
                📖
            </span>
            <span css={styles.time}>{minutesRoundedUp} minute read</span>
        </small>
    );
};

export default ReadingTime;

import React from "react";

import * as styles from "./styles";

const ReadingTime = ({ time }) => {
    return (
        <small className={styles.readingTime}>
            <span aria-label="Reading time" role="img">
                📖
            </span>
            <span className={styles.time}>{time}</span>
        </small>
    );
};

export default ReadingTime;

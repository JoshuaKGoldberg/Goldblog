import React from "react";

import * as styles from "./styles";

const Bio = () => {
    return (
        <div className={styles.footer}>
            <strong className={styles.strong}>Josh Goldberg</strong>
            Hi! I'm a frontend developer from New York. This is my blog about
            JavaScript, TypeScript, and scaling web application development.
            <br />
            This site's{" "}
            <a
                href="https://github.com/JoshuaKGoldberg/goldblog"
                rel="noopener noreferrer"
                target="_blank"
            >
                open source on GitHub
            </a>
            . Found a problem? File an issue!
        </div>
    );
};

export default Bio;

import React from "react";

import * as styles from "./styles";

const Bio = () => {
    return (
        <footer css={styles.footer}>
            <strong css={styles.strong}>Josh Goldberg</strong>
            Hi, I'm Josh! I'm a full time independent open source developer. I
            work on projects in the TypeScript ecosystem such as
            typescript-eslint and TypeStat. This is my blog about JavaScript,
            TypeScript, and open source web development.
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
        </footer>
    );
};

export default Bio;

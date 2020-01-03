import React from "react";

import { Footer, Strong } from "./elements";

const Bio = () => {
    return (
        <Footer>
            <Strong>Josh Goldberg</Strong>
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
        </Footer>
    );
};

export default Bio;

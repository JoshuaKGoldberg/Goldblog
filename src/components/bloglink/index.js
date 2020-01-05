import React from "react";

import * as styles from "./styles";

const BlogLink = ({ link: { url, title } }) => {
    return (
        <>
            <h2 css={styles.hiddenTitle}>{title}</h2>
            <a
                css={styles.externalLink}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
            >
                View on {title}{" "}
                <span aria-label="External link indicator" role="img">
                    ↗
                </span>
            </a>
        </>
    );
};

export default BlogLink;

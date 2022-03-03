import React from "react";

import Seo from "../seo";
import * as styles from "./styles";

const BlogLink = ({
    post: {
        frontmatter: {
            description,
            link: { url, title },
        },
    },
}) => {
    return (
        <>
            <Seo description={description} title={title} />
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

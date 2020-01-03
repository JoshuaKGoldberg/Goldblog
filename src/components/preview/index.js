import { Link } from "gatsby";
import React from "react";

import ReadingTime from "../readingtime";
import * as styles from "./styles";

const ArticlePreview = ({ node }) => {
    const title = node.frontmatter.title || node.fields.slug;
    const { minutes } = node.fields.readingTime;

    const link = node.link ? (
        <a href={node.link} rel="noopener noreferrer" target="_blank">
            {title}
        </a>
    ) : (
        <Link css={styles.heading} to={node.fields.slug}>
            {title}
        </Link>
    );

    return (
        <article css={styles.article}>
            <header>
                <h2 css={styles.linkHeading}>{link}</h2>
                <small>{node.frontmatter.date}</small>
                <ReadingTime minutes={minutes} />
            </header>
            <section>
                <p>{node.frontmatter.description || node.excerpt}</p>
            </section>
        </article>
    );
};

export default ArticlePreview;

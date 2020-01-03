import { Link } from "gatsby";
import React from "react";

import * as styles from "./styles";

const ArticlePreview = ({ node }) => {
    const title = node.frontmatter.title || node.fields.slug;

    const link = node.link ? (
        <a href={node.link} rel="noopener noreferrer" target="_blank">
            {title}
        </a>
    ) : (
        <Link className={styles.heading} to={node.fields.slug}>
            {title}
        </Link>
    );

    return (
        <article className={styles.article}>
            <header>
                <h2 className={styles.linkHeading}>{link}</h2>
                <small>{node.frontmatter.date}</small>
            </header>
            <section>
                <p>{node.frontmatter.description || node.excerpt}</p>
            </section>
        </article>
    );
};

export default ArticlePreview;

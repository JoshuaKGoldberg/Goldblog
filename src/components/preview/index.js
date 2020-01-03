import React from "react";

import ReadingTime from "../readingtime";
import { Article, Heading, LinkHeading } from './elements';

const ArticlePreview = ({ node }) => {
    const title = node.frontmatter.title || node.fields.slug;
    const { minutes } = node.fields.readingTime;

    const link = node.link ? (
        <a href={node.link} rel="noopener noreferrer" target="_blank">
            {title}
        </a>
    ) : (
        <Heading to={node.fields.slug}>
            {title}
        </Heading>
    );

    return (
        <Article>
            <header>
                <LinkHeading>{link}</LinkHeading>
                <small>{node.frontmatter.date}</small>
                <ReadingTime minutes={minutes} />
            </header>
            <section>
                <p>{node.frontmatter.description || node.excerpt}</p>
            </section>
        </Article>
    );
};

export default ArticlePreview;

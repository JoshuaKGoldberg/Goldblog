import React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import * as styles from "./styles";
import NavItem from "../../components/navitem";

const BlogPostTemplate = ({ data, pageContext }) => {
    const post = data.markdownRemark;
    const { previous, next } = pageContext;
    const { date, description, download, title } = post.frontmatter;

    return (
        <Layout>
            <SEO description={description || post.excerpt} title={title} />

            <article className={styles.article}>
                <header>
                    <h2>{title}</h2>
                    <p className={styles.info}>
                        <span>{date}</span>
                        {download && (
                            <span className={styles.download}>
                                <span aria-label="download icon" role="img">
                                    {" "}
                                    💾{" "}
                                </span>{" "}
                                <a
                                    href={download}
                                    rel="noopener noreferrer"
                                    className={styles.downloadMessage}
                                    target="_blank"
                                >
                                    Download the slides here!
                                </a>
                            </span>
                        )}
                    </p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>

            <br />

            <nav>
                <ul className={styles.navList}>
                    {previous && (
                        <NavItem arrow="←" page={previous} rel="prev" />
                    )}
                    {next && <NavItem arrow="→" page={next} rel="next" />}
                </ul>
            </nav>
        </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                download
            }
        }
    }
`;

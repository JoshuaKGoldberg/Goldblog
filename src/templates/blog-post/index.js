import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import * as styles from "./styles";

const BlogPostTemplate = ({ data, pageContext }) => {
    const post = data.markdownRemark;
    const { previous, next } = pageContext;

    return (
        <Layout>
            <SEO
                description={post.frontmatter.description || post.excerpt}
                title={post.frontmatter.title}
            />

            <article style={styles.article}>
                <header>
                    <h2>{post.frontmatter.title}</h2>
                    <p>{post.frontmatter.date}</p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>

            {(previous || next) && (
                <nav>
                    <ul style={styles.navList}>
                        <li>
                            {previous && (
                                <Link to={previous.fields.slug} rel="prev">
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {next && (
                                <Link to={next.fields.slug} rel="next">
                                    {next.frontmatter.title} →
                                    </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            )}
        </Layout>
    );
}

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
            }
        }
    }
`;

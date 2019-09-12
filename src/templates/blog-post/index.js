import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import styles from "./styles.css";

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const { title } = this.props.data.site.siteMetadata;
        const { previous, next } = this.props.pageContext;

        return (
            <>
                <SEO
                    description={post.frontmatter.description || post.excerpt}
                    title={post.frontmatter.title}
                />

                <article>
                    <header>
                        <h1>{post.frontmatter.title}</h1>
                        <p>{post.frontmatter.date}</p>
                        <Link to={'/'}>← {title}</Link>
                    </header>
                    <section dangerouslySetInnerHTML={{ __html: post.html }} />
                </article>

                <nav>
                    {(previous || next) && (
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
                    )}
                </nav>
            </>
        );
    }
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

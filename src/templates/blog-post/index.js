import React from "react";
import { graphql } from "gatsby";

import BlogNav from "../../components/blognav";
import BlogBody from "../../components/blogbody";
import BlogLink from "../../components/bloglink";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const BlogPostTemplate = ({ data, pageContext }) => {
    const post = data.markdownRemark;

    return (
        <Layout>
            <SEO
                description={post.frontmatter.description}
                title={post.title}
            />
            {post.frontmatter.link ? (
                <BlogLink link={post.frontmatter.link} />
            ) : (
                <BlogBody post={post} />
            )}

            <BlogNav pageContext={pageContext} />
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
                date(formatString: "MMMM DD, YYYY")
                description
                download
                link {
                    title
                    url
                }
                title
            }
        }
    }
`;

import React from "react";
import { graphql } from "gatsby";

import BlogNav from "../../components/blognav";
import BlogBody from "../../components/blogbody";
import BlogLink from "../../components/bloglink";
import Layout from "../../components/layout";

const BlogPostTemplate = ({ data, pageContext }) => {
    const post = data.markdownRemark;
    const BodyComponent = post.frontmatter.link ? BlogLink : BlogBody;

    return (
        <Layout>
            <BodyComponent post={post} />
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
                image {
                    base
                }
                keywords
                link {
                    title
                    url
                }
                title
            }
        }
    }
`;

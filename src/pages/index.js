import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticlePreview from "../components/preview";
import SEO from "../components/seo";

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
        <Layout title={siteTitle}>
            <SEO title="All posts" />
            {posts.map(({ node }) => {
                return <ArticlePreview key={node.fields.slug} node={node} />;
            })}
        </Layout>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                    }
                }
            }
        }
    }
`;

import React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import NavItem from "../../components/navitem";
import { NavList, Article, Info, Download, DownloadMessage } from "./elements";

const BlogPostTemplate = ({ data, pageContext }) => {
    const post = data.markdownRemark;
    const { previous, next } = pageContext;
    const { date, description, download, title } = post.frontmatter;

    return (
        <Layout>
            <SEO description={description || post.excerpt} title={title} />

            <Article>
                <header>
                    <h2>{title}</h2>
                    <Info>
                        <span>{date}</span>
                        {download && (
                            <Download>
                                <span aria-label="download icon" role="img">
                                    {" "}
                                    💾{" "}
                                </span>{" "}
                                <DownloadMessage
                                    href={download}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Download the slides here!
                                </DownloadMessage>
                            </Download>
                        )}
                    </Info>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
            </Article>

            <br />

            <nav>
                <NavList>
                    {previous && (
                        <NavItem arrow="←" page={previous} rel="prev" />
                    )}
                    {next && <NavItem arrow="→" page={next} rel="next" />}
                </NavList>
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

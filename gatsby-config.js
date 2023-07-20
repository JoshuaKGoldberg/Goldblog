module.exports = {
    flags: { FAST_DEV: true },
    siteMetadata: {
        author: `Josh Goldberg`,
        description: `Personal blog for Josh Goldberg. It's mostly TypeScript things!`,
        keywords: [
            "blog",
            "josh goldberg",
            "javascript",
            "react",
            "typescript",
        ],
        siteUrl: `https://blog.joshuakgoldberg.com`,
        title: `Goldblog`,
        thumbnail: `/thumbnail.jpg`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-reading-time`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            className: `autolink`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Goldblog`,
                short_name: `Goldblog`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#e7fff5`,
                display: `minimal-ui`,
                icon: `content/assets/icon.png`,
            },
        },
        `gatsby-plugin-emotion`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        // https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/#how-to-use
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    site {
                        siteMetadata {
                            title
                            description
                            siteUrl
                            site_url: siteUrl
                        }
                    }
                }
                `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.nodes.map(node => {
                                return Object.assign({}, node.frontmatter, {
                                    description: node.excerpt,
                                    date: node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                                    custom_elements: [{ "content:encoded": node.html }],
                                })
                            })
                        },
                        query: `
                        {
                            allMarkdownRemark(
                                sort: { order: DESC, fields: [frontmatter___date] },
                                ) {
                                    nodes {
                                        excerpt
                                        html
                                        fields {
                                            slug
                                        }
                                        frontmatter {
                                            title
                                            date
                                        }
                                    }
                                }
                            }
                            `,
                            output: "/rss.xml",
                            title: "The RSS feed for Josh Goldberg's personal blog.",
                        },
                    ],
                },
            },
        ],
    };

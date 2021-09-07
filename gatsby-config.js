module.exports = {
    flags: { PRESERVE_WEBPACK_CACHE: true },
    siteMetadata: {
        author: `Josh Goldberg`,
        description: `Personal blog for Josh Goldberg. It's mostly TypeScript things!`,
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
        `gatsby-plugin-feed`,
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
    ],
};

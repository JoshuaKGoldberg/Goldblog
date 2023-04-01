import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, image, lang, meta, title }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        author
                        description
                        siteUrl
                        title
                        thumbnail
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;
    const previewImage = `${site.siteMetadata.siteUrl}${
        image || site.siteMetadata.thumbnail
    }`;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
        >
            {[
                {
                    content: metaDescription,
                    name: `description`,
                },
                {
                    content: title,
                    property: `og:title`,
                },
                {
                    content: metaDescription,
                    property: `og:description`,
                },
                {
                    content: `website`,
                    property: `og:type`,
                },
                {
                    content: previewImage,
                    name: `thumbnail`,
                },
                {
                    content: `summary`,
                    name: `twitter:card`,
                },
                {
                    content: site.siteMetadata.author,
                    name: `twitter:creator`,
                },
                {
                    content: previewImage,
                    name: `twitter:image`,
                },
                {
                    content: `@JoshuaKGoldberg`,
                    name: `twitter:site`,
                },
                {
                    content: title,
                    name: `twitter:title`,
                },
                {
                    content: metaDescription,
                    name: `twitter:description`,
                },
                ...meta,
            ].map((data) => (
                <meta key={[data.content, data.name].join("/")} {...data} />
            ))}
            <link href="https://fosstodon.org/@JoshuaKGoldberg" rel="me" />
        </Helmet>
    );
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    image: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
};

export default SEO;

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
                    content: `summary`,
                    name: `twitter:card`,
                },
                {
                    content: site.siteMetadata.author,
                    name: `twitter:creator`,
                },
                {
                    content: `${site.siteMetadata.siteUrl}${
                        image || site.siteMetadata.thumbnail
                    }`,
                    name: `twitter:image`,
                },
                {
                    content: `Goldblog`,
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

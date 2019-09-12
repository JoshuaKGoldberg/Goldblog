import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import styles from "./styles.css";

const Bio = () => {
    const data = useStaticQuery(graphql`
        query BioQuery {
            avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
                childImageSharp {
                    fixed(width: 100, height: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            site {
                siteMetadata {
                    author
                    social {
                        twitter
                    }
                }
            }
        }
    `);

    const { author, social } = data.site.siteMetadata;
    return (
        <div className={styles.bio}>
            <Image
                alt={author}
                className={styles.face}
                fixed={data.avatar.childImageSharp.fixed}
                imgStyle={{
                    borderRadius: `50%`,
                }}
            />
            <p className={styles.details}>
                <strong>{author}</strong>
                <span className={styles.links}>
                    <a href="https://github.com">GitHub</a>
                    <a href="https://www.linkedin.com/in/joshuakgoldberglinkedin">
                        LinkedIn
                    </a>
                    <a href="https://joshuakgoldberg.com">Site</a>
                    <a href={`https://twitter.com/${social.twitter}`}>
                        Twitter
                    </a>
                </span>
            </p>
        </div>
    );
};

export default Bio;

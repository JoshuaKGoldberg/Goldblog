import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import * as styles from "./styles";

const links = [
    ["GitHub", "github.com/joshuakgoldberg"],
    ["Site", "joshuakgoldberg.com"],
    ["Twitter", "twitter.com/JoshuaKGoldberg"],
];

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
        }
    `);

    return (
        <div className={styles.bio}>
            <Image
                fixed={data.avatar.childImageSharp.fixed}
                imgStyle={{
                    borderRadius: `50%`,
                }}
                className={styles.face}
            />
            <div className={styles.details}>
                <div className={styles.links}>
                    {links.map(([text, url]) => (
                        <a
                            key={text}
                            href={`https://${url}`}
                            className={styles.link}
                        >
                            {text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bio;

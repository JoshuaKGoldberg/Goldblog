import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { BioContainer, Face, Details, TopLinks, TopLink } from "./elements";

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
        <BioContainer>
            <Face
                fixed={data.avatar.childImageSharp.fixed}
                imgStyle={{
                    borderRadius: `50%`,
                }}
            />
            <Details>
                <TopLinks>
                    {links.map(([text, url]) => (
                        <TopLink key={text} href={`https://${url}`}>
                            {text}
                        </TopLink>
                    ))}
                </TopLinks>
            </Details>
        </BioContainer>
    );
};

export default Bio;

import React, { useEffect } from "react";

import SEO from "../seo";
import * as styles from "./styles";

const BlogBody = ({ post }) => {
    const { date, description, download, title } = post.frontmatter;

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("./makeGifsPausable").then(makeGifsPausable => makeGifsPausable.default());
        }
    }, []);

    return (
        <>
            <SEO description={description || post.excerpt} title={title} />

            <article css={styles.article}>
                <header>
                    <h2>{title}</h2>
                    <p css={styles.info}>
                        <span>{date}</span>
                        {download && (
                            <span css={styles.download}>
                                <span aria-label="download icon" role="img">
                                    {" "}
                                    💾{" "}
                                </span>{" "}
                                <a
                                    href={download}
                                    rel="noopener noreferrer"
                                    css={styles.downloadMessage}
                                    target="_blank"
                                >
                                    Download the slides here!
                                </a>
                            </span>
                        )}
                    </p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>
        </>
    );
};

export default BlogBody;

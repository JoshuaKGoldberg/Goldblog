import React from "react";
import { Link } from "gatsby";

import Bio from "./bio";
import Footer from "./footer";
import * as styles from "./styles";

const Layout = ({ children, title = "Goldblog" }) => {
    return (
        <div css={styles.layout}>
            <header css={styles.header}>
                <h1 css={styles.heading}>
                    <Link css={styles.headingLink} to={`/`}>
                        {title}
                    </Link>
                </h1>
                <Bio />
            </header>
            <main css={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

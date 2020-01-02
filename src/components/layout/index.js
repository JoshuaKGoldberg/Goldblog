import React from "react";
import { Link } from "gatsby";

import Bio from "./bio";
import Footer from "./footer";
import * as styles from "./styles";

const Layout = ({ children, title = "Goldblog" }) => {
    return (
        <div style={styles.layout}>
            <header style={styles.header}>
                <h1 style={styles.heading}>
                    <Link style={styles.headingLink} to={`/`}>
                        {title}
                    </Link>
                </h1>
                <Bio />
            </header>
            <main style={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

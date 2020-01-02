import React from "react";
import { Link } from "gatsby";

import Bio from "./bio";
import Footer from "./footer";
import * as styles from "./styles";

const Layout = ({ children, title = "Goldblog" }) => {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1 className={styles.heading}>
                    <Link className={styles.headingLink} to={`/`}>
                        {title}
                    </Link>
                </h1>
                <Bio />
            </header>
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

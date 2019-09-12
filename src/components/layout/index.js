import React from "react";
import { Link } from "gatsby";

import Bio from "../bio";
import styles from "./styles.css";

const Layout = ({ children, location, title }) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const header = (
        <h1>
            {location.pathname === rootPath ? (
                title
            ) : (
                <Link to={`/`}>{title}</Link>
            )}
        </h1>
    );

    return (
        <div>
            <header>{header}</header>
            <main className={styles.main}>{children}</main>
            <footer>
                <Bio />
            </footer>
        </div>
    );
};

export default Layout;

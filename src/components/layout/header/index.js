import { Link } from "gatsby";
import React from "react";

import Bio from "../bio";
import DarkModeToggle from "./darkModeToggle";
import * as styles from "./styles";

const Header = () => {
    return (
        <header css={styles.header}>
            <DarkModeToggle />
            <div css={styles.title}>
                <Link css={styles.titleLink} to="/">
                    Goldblog
                </Link>
            </div>
            <Bio />
        </header>
    );
};

export default Header;

import React from "react";

import NavItem from "../navitem";
import * as styles from "./styles";

const PageContext = ({ pageContext: { previous, next } }) => {
    return (
        <nav css={styles.nav}>
            <ul css={styles.navList}>
                {previous && <NavItem arrow="←" page={previous} rel="prev" />}
                {next && <NavItem arrow="→" page={next} rel="next" />}
            </ul>
        </nav>
    );
};

export default PageContext;

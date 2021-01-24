import { Global } from "@emotion/react";
import React from "react";
import { useLocalStorage, useMountedState } from "react-use";

import DarkMode from "../../context/darkMode";
import Footer from "./footer";
import Header from "./header";
import * as styles from "./styles";

const Layout = ({ children }) => {
    const [darkMode, setDarkMode] = useLocalStorage(
        "goldblog-dark-mode",
        false
    );
    const isMounted = useMountedState();

    return (
        <DarkMode.Provider value={{ darkMode, setDarkMode }}>
            <Global styles={styles.global(darkMode, isMounted())} />
            <div css={styles.layout}>
                <Header />
                <main css={styles.main}>{children}</main>
                <Footer />
            </div>
        </DarkMode.Provider>
    );
};

export default Layout;

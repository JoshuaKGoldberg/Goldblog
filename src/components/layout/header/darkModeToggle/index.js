import React, { useContext } from "react";

import DarkMode from "../../../../context/darkMode";
import * as styles from "./styles";

const DarkModeToggle = () => {
    const { darkMode, setDarkMode } = useContext(DarkMode);

    return (
        <button
            aria-label={`${darkMode ? "Disable" : "Enable"} dark mode`}
            css={styles.button(darkMode)}
            onClick={() => setDarkMode(!darkMode)}
            type="button"
        />
    );
};

export default DarkModeToggle;

import { darkGray, lightGray, medium } from "../../../../styles/constants";
import { textColor } from "../../../../styles/variables";

const height = "1.25rem";
const width = "2.5rem";

export const button = (darkMode) => ({
    background: darkMode ? darkGray : lightGray,
    border: `2px solid ${darkMode ? lightGray : darkGray}`,
    borderRadius: `0.75rem`,
    cursor: "pointer",
    height,
    opacity: darkMode ? 1 : 0.7,
    outline: "none",
    position: "absolute",
    right: "1rem",
    top: "1rem",
    transition: `${medium} background, ${medium} border, ${medium} box-shadow`,
    width,

    "&:focus": {
        boxShadow: `0 0 1px 2px ${textColor}`,
    },

    "&::before": {
        alignItems: "center",
        content: '"🌝🌞"',
        display: "flex",
        fontSize: ".75rem",
        justifyContent: "center",
        left: 0,
        lineHeight: 0,
        position: "absolute",
        right: 0,
        top: "50%",
    },

    "&::after": {
        background: darkMode ? lightGray : darkGray,
        borderRadius: "100%",
        boxShadow: ` 0 0 1px 1px ${darkMode ? darkGray : lightGray}`,
        content: '""',
        display: "block",
        height: `calc(${height} - 0px)`,
        left: 0,
        marginLeft: darkMode ? `calc(100% - ${height} + 2px)` : "-2px",
        position: "absolute",
        top: "-2px",
        transition: `${medium} margin-left, ${medium} background`,
        width: `calc(${height} - 0px)`,
    },
});

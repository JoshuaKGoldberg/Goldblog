import { darkGray, lightGray, medium } from "../../../../styles/constants";
import { textColor } from "../../../../styles/variables";

const height = "1.5rem";
const width = "3rem";

export const button = (darkMode) => ({
    background: darkMode ? darkGray : lightGray,
    border: `2px solid ${darkMode ? lightGray : darkGray}`,
    borderRadius: `0.75rem`,
    cursor: "pointer",
    height,
    opacity: darkMode ? 1 : 0.7,
    outline: "none",
    position: "relative",
    marginRight: "1rem",
    transition: `${medium} background, ${medium} border, ${medium} box-shadow`,
    width,

    "&:focus": {
        boxShadow: `0 0 2px 2px ${textColor}`,
    },

    "&::before": {
        alignItems: "center",
        content: '"🌝🌞"',
        display: "flex",
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
        boxShadow: ` 0 0 2px 2px ${darkMode ? darkGray : lightGray}`,
        content: '""',
        display: "block",
        height: `calc(${height} - 4px)`,
        left: 0,
        marginLeft: darkMode ? `calc(100% - ${height} + 4px)` : "-1px",
        marginTop: "0",
        position: "absolute",
        top: 0,
        transition: `${medium} margin-left, ${medium} background`,
        width: `calc(${height} - 4px)`,
    },
});

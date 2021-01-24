import { css } from "@emotion/react";
import {
    darkGray,
    lightGray,
    medium,
    nearBlack,
    openSansRegular,
    phoneMediumMax,
    phoneMediumMin,
} from "../../styles/constants";
import {
    backgroundColor,
    cssVar,
    darkInversion,
    textColor,
    textColorDull,
} from "../../styles/variables";

export const global = (darkMode) => css`
    html {
        ${cssVar(backgroundColor)}: ${darkMode ? nearBlack : "white"};
        ${cssVar(darkInversion)}: ${darkMode
            ? "invert(100%) hue-rotate(175deg)"
            : "none"};
        ${cssVar(textColor)}: ${darkMode ? lightGray : "black"};
        ${cssVar(textColorDull)}: ${darkMode ? lightGray : darkGray};

        background: ${backgroundColor};
        color: ${textColor};
        transition: ${medium} background, ${medium} color;
    }

    a {
        color: ${textColorDull};
        font-weight: bold;
        transition: ${medium} color;
    }

    a:focus {
        color: ${textColor};
    }

    blockquote {
        border-left: 3px solid ${textColorDull};
        color: ${textColorDull};
        font-style: italic;
        letter-spacing: -0.02rem;
        margin: 2rem 0;
        padding-left: 1rem;

        transition: ${medium} border-left, ${medium} color;
    }
`;

export const layout = {
    fontFamily: openSansRegular,
    margin: "auto",
    maxWidth: "calc(630px + 1rem)",
    padding: "0 1rem",
};

export const main = {
    borderTop: "1px solid #ccc",
    flexGrow: 1,
    fontSize: "1.05rem",
    letterSpacing: "-0.01rem",
    lineHeight: "1.75rem",
    marginTop: "3rem",

    [phoneMediumMax]: {
        paddingTop: "1rem",
    },

    [phoneMediumMin]: {
        marginTop: "1.5rem",
    },
};

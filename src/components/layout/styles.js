import { css } from "@emotion/react";
import {
    darkGray,
    darkestGray,
    emphasizedBlueDark,
    emphasizedBlueLight,
    emphasizedGreenDark,
    emphasizedGreenLight,
    lightGray,
    medium,
    nearBlack,
    openSansRegular,
    phoneMediumMax,
    phoneMediumMin,
} from "../../styles/constants";
import {
    backgroundColor,
    borderColorDull,
    cssVar,
    darkInversion,
    gradientBegin,
    gradientEnd,
    textColor,
    textColorDull,
} from "../../styles/variables";

export const global = (darkMode, isMounted) => css`
    html {
        ${cssVar(backgroundColor)}: ${darkMode ? nearBlack : "white"};
        ${cssVar(borderColorDull)}: ${darkMode ? darkGray : lightGray};
        ${cssVar(darkInversion)}: ${darkMode
            ? "invert(100%) hue-rotate(175deg)"
            : "none"};
        ${cssVar(gradientBegin)}: ${darkMode
            ? emphasizedBlueDark
            : emphasizedBlueLight};
        ${cssVar(gradientEnd)}: ${darkMode
            ? emphasizedGreenDark
            : emphasizedGreenLight};
        ${cssVar(textColor)}: ${darkMode ? lightGray : darkestGray};
        ${cssVar(textColorDull)}: ${darkMode ? lightGray : "black"};

        background: ${backgroundColor};
        color: ${textColor};
        ${isMounted && `transition: ${medium} background, ${medium} color;`}
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
        color: ${textColorDull};
        font-style: italic;
        letter-spacing: -0.02rem;
        margin: 2rem 0;
        padding-left: 1rem;
        position: relative;
        transition: ${medium} border-left, ${medium} color;
    }

    blockquote:before {
        color: ${gradientBegin};
        background: linear-gradient(
            to bottom,
            ${gradientBegin} 0,
            ${gradientEnd} 100%
        );
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        width: 5px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${textColorDull};
    }
`;

export const layout = {
    fontFamily: openSansRegular,
    margin: "auto",
    maxWidth: "calc(700px + 1rem)",
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

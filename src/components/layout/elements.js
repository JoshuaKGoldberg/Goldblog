import { Link } from "gatsby";
import styled from "styled-components";

import {
    lightGreen,
    lightBlue,
    latoRegular,
    openSansRegular,
    phoneMediumMin,
    phoneMediumMax,
} from "../../styleConstants";

export const LayoutContainer = styled.div({
    fontFamily: openSansRegular,
    margin: "auto",
    maxWidth: "calc(630px + 1rem)",
    padding: "0 1rem",
});

export const Header = styled.header({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "1.5rem",
});

export const Heading = styled.h1({
    background: `linear-gradient(to right, ${lightGreen} 0%, ${lightBlue} 100%)`,
    fontFamily: latoRegular,
    padding: "0.5rem",

    [phoneMediumMin]: {
        marginRight: "2rem",
    },
});

export const HeadingLink = styled(Link)({
    color: "black",
    textDecoration: "none",
});

export const Main = styled.main({
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
});

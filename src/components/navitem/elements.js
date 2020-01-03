import { Link } from "gatsby";
import styled from "styled-components";

export const NavItemContainer = styled.li({
    "&:first-of-type + &:nth-of-type(2)": {
        marginTop: "2rem",
    },
});

export const CreateNavLink = rel =>
    styled(Link)({
        alignItems: "center",
        display: "flex",
        ...(rel === "next" && { textAlign: "right" }),
        flexDirection: rel === "prev" ? "row" : "row-reverse",
        lineHeight: "1.3rem",
        margin: "-0.5rem -1rem",
        padding: "0.5rem 1rem",
        textDecoration: "none",
    });

export const CreateNavArrow = rel =>
    styled.span({
        [rel === "prev" ? "paddingRight" : "paddingLeft"]: "1rem",
    });

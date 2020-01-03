import { css } from "emotion";

export const navList = css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    listStyle: "none",
    padding: 0,
});

export const navItem = css({
    "&:first-of-type + &:nth-of-type(2)": {
        marginTop: "2rem",
    },
});

export const navLink = rel =>
    css({
        alignItems: "center",
        display: "flex",
        ...(rel === "next" && { textAlign: "right" }),
        flexDirection: rel === "prev" ? "row" : "row-reverse",
        lineHeight: "1.3rem",
        margin: "-0.5rem -1rem",
        padding: "0.5rem 1rem",
        textDecoration: "none",
    });

export const navArrow = rel =>
    css({
        [rel === "prev" ? "paddingRight" : "paddingLeft"]: "1rem",
    });

export const navList = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    listStyle: "none",
    padding: 0,
};

export const navItem = {
    "&:first-of-type + &:nth-of-type(2)": {
        marginTop: "2rem",
    },
};

export const navLink = rel => ({
    alignItems: "center",
    display: "flex",
    ...(rel === "next" && { textAlign: "right" }),
    flexDirection: rel === "prev" ? "row" : "row-reverse",
    lineHeight: "1.3rem",
    margin: "-0.5rem -1rem",
    padding: "0.5rem 1rem",
    textDecoration: "none",
});

export const navArrow = rel => ({
    [rel === "prev" ? "paddingRight" : "paddingLeft"]: "1rem",
});

import styled from "styled-components";

export const NavList = styled.ul({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    listStyle: "none",
    padding: 0,
});

export const Article = styled.article({
    margin: 0,
    padding: 0,
});

export const Info = styled.p({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
});

export const Download = styled.span({
    display: "flex",
    alignItems: "center",
});

export const DownloadMessage = styled.a({
    fontWeight: "normal",
    marginRight: "-0.5rem",
    padding: "0 0.5rem",
    transition: "350ms margin",

    "&:focus": {
        marginLeft: "0.5rem",
    },
});

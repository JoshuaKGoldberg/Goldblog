import {
    lightGreen,
    lightBlue,
    latoRegular,
    openSansRegular,
} from "../../styleConstants";

export const layout = {
    fontFamily: openSansRegular,
    margin: "auto",
    maxWidth: "calc(700px + 1rem)",
    padding: "0 1rem",
};

export const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "1.5rem",
};

export const heading = {
    background: `linear-gradient(to right, ${lightGreen} 0%, ${lightBlue} 100%)`,
    fontFamily: latoRegular,
    marginRight: "2rem",
    padding: "0.5rem",
};

export const headingLink = {
    color: "black",
    textDecoration: "none",
};

export const bio = {
    // flexGrow: 0.7,
};

export const main = {
    borderTop: "1px solid #ccc",
    flexGrow: 1,
    marginTop: "1.5rem",
};

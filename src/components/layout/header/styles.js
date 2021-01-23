import {
    lightGreen,
    lightBlue,
    latoRegular,
    phoneMediumMin,
} from "../../../styles/constants";

export const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "1.5rem",
};

export const title = {
    background: `linear-gradient(to right, ${lightGreen} 0%, ${lightBlue} 100%)`,
    fontFamily: latoRegular,
    fontSize: "2rem",
    padding: "0.5rem",

    [phoneMediumMin]: {
        marginRight: "2rem",
    },
};

export const titleLink = {
    color: "black",
    textDecoration: "none",

    "&:focus": {
        color: "black",
    },
};

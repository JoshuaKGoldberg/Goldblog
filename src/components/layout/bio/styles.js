import {
    darkGray,
    latoRegular,
    phoneMediumMax,
    phoneMediumMin,
} from "../../../styleConstants";

export const bio = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",

    [phoneMediumMin]: {
        flexDirection: "row",
    },
};

export const face = {
    [phoneMediumMin]: {
        marginRight: "0.5rem",
    },
    [phoneMediumMax]: {
        marginBottom: "1rem",
    },
};

export const details = {
    alignItems: "left",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "1rem",
};

export const links = {
    alignItems: "center",
    display: "flex",
};

export const link = {
    fontFamily: latoRegular,
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginRight: "0.5rem",
    textDecoration: "none",
    color: darkGray,
};

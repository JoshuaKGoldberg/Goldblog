import { css } from "emotion";

import { darkGray, latoRegular, phoneMediumMax, phoneMediumMin } from "../../../styleConstants";

export const bio = css({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",

    [phoneMediumMin]: {
        flexDirection: "row",
    },
});

export const face = css({
    [phoneMediumMax]: {
        marginBottom: "1rem",
    },
});

export const details = css({
    alignItems: "left",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "1rem",
});

export const links = css({
    alignItems: "center",
    display: "flex",
});

export const link = css({
    fontFamily: latoRegular,
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginRight: "0.5rem",
    textDecoration: "none",
    color: darkGray,
});

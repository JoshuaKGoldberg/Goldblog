import { css } from "emotion";

import { latoRegular, darkGray } from "../../../styleConstants";

export const bio = css({
    display: "flex",
});

export const face = css({
    borderRadius: "100%",
    minWidth: "100px",
});

export const details = css({
    alignItems: "left",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "2rem",
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

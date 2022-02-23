import { css } from "@emotion/react";
import { latoRegular, phoneMediumMin } from "../../../styles/constants";
import { gradientBegin, gradientEnd } from "../../../styles/variables";

export const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "1.5rem",
};

export const title = css`
    background: linear-gradient(to right, ${gradientBegin} 0%, ${gradientEnd} 100%);
    font-family: ${latoRegular};
    font-size: 2rem;
    padding: 0.5rem;

    ${phoneMediumMin} {
        margin-right: 2rem;
    };
}`;

export const titleLink = {
    color: "black",
    textDecoration: "none",

    "&:focus": {
        color: "black",
    },
};

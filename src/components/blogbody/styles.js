import { medium } from "../../styles/constants";
import {
    borderColorDull,
    darkInversion,
    textColor,
} from "../../styles/variables";

export const article = {
    margin: 0,
    padding: 0,
};

export const info = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
};

export const download = {
    display: "flex",
    alignItems: "center",
};

export const downloadMessage = {
    fontWeight: "normal",
    marginRight: "-0.5rem",
    padding: "0 0.5rem",
    transition: `${medium} margin`,

    "&:focus": {
        marginLeft: "0.5rem",
    },
};

export const section = {
    "& code": {
        background: "none",
        filter: darkInversion,
        transition: `${medium} filter`,
    },

    "& pre": {
        background: "none",
        border: `1px solid ${borderColorDull}`,
        transition: `${medium} border`,
    },

    '& img[src*="gif"]': {
        cursor: "pointer",
        transition: `${medium} box-shadow`,

        "&[tabIndex]:focus, &[tabIndex]:hover": {
            boxShadow: `0 0 0 1px ${textColor}, 0 0 2px ${textColor}`,
            outline: "none",
            opacity: 1,
        },
    },

    "& .ff-container": {
        marginBottom: "0.5rem",

        "&.ff-loading-icon::before": {
            display: "none",
        },
    },
};

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
    transition: "350ms margin",

    "&:focus": {
        marginLeft: "0.5rem",
    },
};

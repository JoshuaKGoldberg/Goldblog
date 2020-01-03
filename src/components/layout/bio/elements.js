import Image from "gatsby-image";
import styled from "styled-components";

import {
    darkGray,
    latoRegular,
    phoneMediumMax,
    phoneMediumMin,
} from "../../../styleConstants";

export const BioContainer = styled.div({
           alignItems: "center",
           display: "flex",
           flexDirection: "column",

           [phoneMediumMin]: {
               flexDirection: "row",
           },
       });

export const Face = styled(Image)({
    [phoneMediumMin]: {
        marginRight: "0.5rem",
    },
    [phoneMediumMax]: {
        marginBottom: "1rem",
    },
});

export const Details = styled.div({
    alignItems: "left",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "1rem",
});

export const TopLinks = styled.div({
    alignItems: "center",
    display: "flex",
});

export const TopLink = styled.a({
    fontFamily: latoRegular,
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginRight: "0.5rem",
    textDecoration: "none",
    color: darkGray,
});

import { Link } from "gatsby";
import styled from "styled-components";

export const Article = styled.article({
    paddingTop: "2rem",
});

export const Heading = styled(Link)({
    color: "black",
    margin: "-0.35rem -0.5rem",
    padding: "0.35rem 0.5rem",
});

export const LinkHeading = styled.h2({
    marginBottom: "0",
});

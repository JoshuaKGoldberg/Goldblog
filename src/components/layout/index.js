import React from "react";

import Bio from "./bio";
import Footer from "./footer";
import {
    Header,
    Heading,
    HeadingLink,
    LayoutContainer,
    Main,
} from "./elements";

const Layout = ({ children, title = "Goldblog" }) => {
    return (
        <LayoutContainer>
            <Header>
                <Heading>
                    <HeadingLink to={`/`}>{title}</HeadingLink>
                </Heading>
                <Bio />
            </Header>
            <Main>{children}</Main>
            <Footer />
        </LayoutContainer>
    );
};

export default Layout;

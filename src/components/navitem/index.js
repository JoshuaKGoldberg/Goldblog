import React from "react";

import { NavItemContainer, CreateNavLink, CreateNavArrow } from "./elements";

const NavItem = ({ arrow, page, rel }) => {
    const NavArrow = CreateNavArrow(rel);
    const NavLink = CreateNavLink(rel);

    return (
        <NavItemContainer>
            <NavLink to={page.fields.slug} rel={rel}>
                <NavArrow>{arrow}</NavArrow>{" "}
                <span>{page.frontmatter.title}</span>
            </NavLink>
        </NavItemContainer>
    );
};

export default NavItem;

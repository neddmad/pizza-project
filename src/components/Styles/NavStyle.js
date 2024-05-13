import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 10px;
`;

export const NavbarLink = styled(Link)`
  &:focus {
    color: gray;
  }
`;

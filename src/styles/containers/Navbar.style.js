import styled from "styled-components";

export const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 1;

  > button {
    margin-right: 1rem;
  }

  > div {
    margin-left: 1rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;
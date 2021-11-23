import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.show ? "0" : "-230px"};
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 100vh;
  background-color: ${(props) => props.theme.inputSecondaryColor};
  z-index: 2;
  transition: 0.3s ease left;
`;

export const TitleContainer = styled.div`
  padding: 0 20px 0 10px;
  height: 50px;
  display: flex;
  align-items: center;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
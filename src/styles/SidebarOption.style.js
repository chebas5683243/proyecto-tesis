import styled from "styled-components";

export const StyledOption = styled.div`
  height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${props => props.theme.white};
  font-weight: 300;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.inputPrimaryColor};
  }

  span {
    padding-left: 15px;
  }
`;
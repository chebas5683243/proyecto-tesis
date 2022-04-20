import styled from "styled-components";

export const DeleteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > svg {
    color: ${props => props.theme.palette.primary.main};
    font-size: 5rem;
  }

  > p {
    text-align: center;
    color: black;

    b {
      color: ${props => props.theme.inputSecondaryColor};
    }
  }
`;
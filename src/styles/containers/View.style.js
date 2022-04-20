import styled from "styled-components";

export const ListViewContainer = styled.div`
  min-height: calc(100vh - 8rem);
  height: 100%;
  padding: 1rem 3rem 4rem 3rem;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  z-index: -1;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PrimaryTitle = styled.h1`
  display: inline;
  font-size: 2rem;
  font-weight: 800;
  color: ${(props) => props.theme.inputSecondaryColor};
`;

export const SecondaryTitle = styled.h1`
  display: inline;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.gray};
  margin-left: 1rem;
`;

export const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
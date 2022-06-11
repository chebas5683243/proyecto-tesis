import styled from "styled-components";

export const FiltrosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100vh;
  background-color: ${(props) => props.theme.white};
  z-index: 2;

  > div {
    padding: 1rem;
  }

  .filtros--header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .filtros--header-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: ${(props) => props.theme.inputSecondaryColor};
    }
  }

  .filtros--body {
    display: flex;
    flex-direction: column;
    font-size: .75rem;

    .label-filtro {
      margin-top: 1.5rem;
      margin-bottom: .25rem;

      &:first-child {
        margin-top: 0rem;
      }
    }
  }
`;
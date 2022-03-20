import styled from "styled-components";

export const EstandarValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .5rem;

  .titulo-estandar {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-weight: 700;
    color: #555155;
    font-size: 1.5rem;
    margin-bottom: .5rem;

    button {
      color: ${props => props.theme.helpColor};
      /* padding: 0; */
    }
  }

  .etiqueta-estandar {
    width: 265px;
    padding: .5rem 0;
    text-align: center;
    border-radius: .25rem;
  }

  .check-field-container button svg {
    color: red;
  }

  .estado-uno {
    background-color: ${props => props.theme.estado1Bg};
    color: ${props => props.theme.estado1Color};
  }

  .estado-dos {
    background-color: ${props => props.theme.estado2Bg};
    color: ${props => props.theme.estado2Color};
  }

  .estado-tres {
    background-color: ${props => props.theme.estado3Bg};
    color: ${props => props.theme.estado3Color};
  }

  .estado-cuatro {
    background-color: ${props => props.theme.estado4Bg};
    color: ${props => props.theme.estado4Color};
  }

  .estado-cinco {
    background-color: ${props => props.theme.estado5Bg};
    color: ${props => props.theme.estado5Color};
  }
  
  .estado-seis {
    background-color: ${props => props.theme.estado6Bg};
    color: ${props => props.theme.estado6Color};
  }

  input {
    text-align: right;
  }
`;
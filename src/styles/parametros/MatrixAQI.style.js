import styled from "styled-components";

export const MatrixAQIContainer = styled.div`
  .titulo-matriz {
    display: flex;
    align-self: center;
    gap: .5rem;
    font-weight: 700;
    color: #555155;
    font-size: 1.5rem;

    button {
      color: ${props => props.theme.helpColor};
      padding: 0;
    }
  }

  .matriz-aqi {
    margin-top: 1rem;
    display: flex;

    .separated {
      margin-right: 1.5rem;
    }

    .columnas-matriz {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .header-matriz {
        display: flex;
        align-items: center;
        gap: .5rem;
        font-weight: 700;
        color: #555155;
        font-size: 1rem;

        button {
          color: ${props => props.theme.helpColor};
          padding: 0;
        }
      }

      .etiqueta-matriz {
        width: 150px;
        padding: .5rem 0;
        text-align: center;
        border-radius: .25rem;
      }

      .inputs-matriz {
        min-width: 150px;
        display: flex;
        align-items: center;

        input {
          text-align: right;
        }

        svg {
          color: red;
        }
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
    }
  }
`;
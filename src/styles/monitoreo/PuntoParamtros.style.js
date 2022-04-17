import styled from 'styled-components';

export const PuntoParamtrosContainer = styled.div`
  width: 28rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .drawer-title {
    color: ${props => props.theme.inputSecondaryColor};
    font-size: 1.5rem;
    font-weight: 600;
  }

  .drawer-subtitle {
    margin-top: .25rem;
    font-size: .875rem;
  }

  .buscador-parametros {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .MuiDivider-root {
    margin: 1rem 0;
    background-color: ${props => props.theme.palette.primary.main};
  }

  .lista-parametros {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .75rem;

    .item-parametro {
      border-radius: .5rem;
      border: 1px solid ${props => props.theme.palette.primary.main};
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      padding: .5rem;
      display: flex;
      align-items: center;

      .detalle-parametro {
        display: flex;
        flex-direction: column;
        flex: 1;

        .nombre-parametro {
          font-size: 1rem;
          font-weight: 500;
        }

        .abreviatura-parametro {
          font-size: .75rem;
        }
      }

      .tipo-parametrizacion-container {
        width: 6rem;

        .tipo-parametrizacion {
          margin: auto;
          padding: .5rem;
          width: fit-content;
          border-radius: .25rem;
          font-size: .875rem;
          background-color: lightblue;
          color: blue;
        }
      }

      .opciones {
        display: flex;
        
        button {
          color: ${props => props.theme.inputSecondaryColor};
        }
      }
    }
  }
`;
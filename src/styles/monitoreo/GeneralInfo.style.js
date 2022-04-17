import styled from 'styled-components';

export const GeneralInfoContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 2rem;

  .info-card {
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: 0px 0px 2px #0030A8;
    width: 100%;
    flex: 1.5;
    
    > img {
      object-fit: fill;
      border-radius: 1rem 1rem 0 0;
      width: 100%;
      max-height: 10rem;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      padding: 1rem .75rem;

      .codigo-proyecto {
        font-size: .75rem;
        font-weight: 300;
      }

      .nombre-proyecto {
        font-size: 1rem;
        font-weight: 700;
        color: ${props => props.theme.inputSecondaryColor};
        margin: .75rem 0;
      }

      .detalle-container {
        display: flex;
        align-items: center;
        gap: .5rem;
        margin-bottom: .5rem;

        img {
          height: 20px;
          width: 20px;
        }

        span {
          font-size: .75rem;
          font-weight: 300;
        }
      }

      .descripcion-proyecto {
        font-size: .75rem;
        text-align: justified;
        margin-top: .5rem;
      }

      .ultimo-registro-proyecto {
        margin-top: .5rem;
        text-align: right;
        font-size: .75rem;
      }
    }
  }

  .fases-proyectos {
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: 0px 0px 2px #0030A8;
    width: 100%;
    flex: 1.5;

    .titulo-fases {
      padding:  1rem 1rem 0rem 1rem;
      font-size: 1.125rem;
      font-weight: 700;
      color: ${props => props.theme.inputSecondaryColor};
    }
    
    .MuiStepper-vertical {
      margin: auto;
      padding: .5rem 1rem;

      .titulo-fase {
        font-weight: 500;
        font-size: 1rem;
      }

      .estado-fase {
        font-size: .75rem;
      }

      .descripcion-fase {
        font-size: .875rem;
      }
    }
  }

  .widgets-container {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    width: 100%;
    flex: 1;

    .widget {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: white;
      align-items: center;
      border-radius: 1rem;
      box-shadow: 0px 0px 2px #0030A8;
      width: 100%;
      flex: 1.5;

      .big-number {
        font-size: 3.5rem;
        font-weight: 700;
        color: ${props => props.theme.palette.primary.main};
      }

      .widget-description {
        font-size: 1rem;
        font-weight: 400;
        color: ${props => props.theme.inputSecondaryColor};
      }
    }
  }
`;
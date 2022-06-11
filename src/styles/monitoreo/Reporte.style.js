import styled from 'styled-components';

export const ReporteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 0;
  margin-bottom: 2rem;

  .header-container {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .go-back-button {
      cursor: pointer;

      &:hover span {
        text-decoration: underline;
      }
    }
  }

  .titulo-container {
    margin: 1.75rem 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: ${props => props.theme.inputSecondaryColor};
  }

  .info-general-container {
    background-color: ${props => props.theme.white};
    box-shadow: 0px 0px 2px ${props => props.theme.inputSecondaryColor};
    border-radius: 10px;
    padding: 1.5rem 1.5rem .5rem 1.5rem;
    margin-bottom: 1.25rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 1rem;

    .info-container {
      margin-bottom: 1.5rem;
      width: 45%;
      display: flex;
      flex-direction: column;
      gap: .75rem;

      .info-titulo {
        font-weight: 700;
        color: ${props => props.theme.inputSecondaryColor};
      }
    }
  }

  .widget {
    background-color: ${props => props.theme.white};
    box-shadow: 0px 0px 2px ${props => props.theme.inputSecondaryColor};
    border-radius: 10px;
    padding: .75rem 1rem .75rem 1.25rem;
    display: flex;
    flex-direction: column;

    .widget-titulo {
      font-weight: 700;
      color: ${props => props.theme.inputSecondaryColor};
    }
  }
  
  .small-bar {
    margin-top: .4375rem;
    width: 100%;
    height: 6px;
    background-color: ${props => props.theme.helpColor};
    display: flex;
  }

  .info-parametros-container {
    display: flex;
    gap: 2rem;

    .widget-parametros {
      flex: 1;
      .numeros-parametros {
        margin-top: 1.875rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .big-number {
          font-size: 1.5rem;
        }

        .small-number {
          font-size: .875rem;
          color: #979797;
        }
      }
    }

    .widget-parametrizacion {
      flex: 2;

      .small-bar {
        margin: .875rem 0;
      }

      .leyenda-container {
        display: flex;
        justify-content: space-between;

        .leyenda-item {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: .25rem;

          .item-nombre {
            font-size: .75rem;
            font-weight: 700;
          }

          .item-value {
            margin-top: .125rem;
            display: flex;
            align-items: center;
            gap: .75rem;

            .bolita {
              border-radius: 50%;
              width: .5rem;
              height: .5rem;
            }
          }
        }
      }
    }
  }

  .parametrizaciones-container {
    margin-top: 2.75rem;
    margin-bottom: 2.625rem;

    .section-titulo {
      font-size: 1.25rem;
      font-weight: 700;
      color: ${props => props.theme.inputSecondaryColor};
    }

    .widgets-container {
      margin-top: 1.375rem;
      display: flex;
      gap: 2rem;

      .widget-tipos {
        width: 100%;
        flex: 1;

        .data-container {
          display: flex;
          align-items: center;
          gap: 1rem;

          .leyenda-container {
            display: flex;
            gap: 1.5rem;

            .leyenda-izq {
              display: flex;
              flex-direction:column;
              gap: .25rem;
              font-weight: 600;
            }

            .leyenda-der {
              display: flex;
              gap: .25rem;
              flex-direction:column;
              text-align: right;
            }
          }
        }
      }
    }
  }
`;
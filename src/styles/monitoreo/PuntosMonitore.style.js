import styled from 'styled-components';

export const PuntosMonitoreoContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 0;

  .points-map-container {
    margin-top: 1rem;
    height: calc(100vh - 11rem);
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: .5rem;

    .leaflet-container {
      width: 100%;
      flex: 1;
    }

    .info-punto-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: .75rem;
      background-color: ${props => props.theme.white};
      border-radius: .25rem;
      box-shadow: 0px 0px 2px ${props => props.theme.inputSecondaryColor};

      .titulo-info {
        display: flex;
        flex-direction: column;
        gap: .125rem;

        .nombre-punto {
          font-size: 1rem;
          color: ${props => props.theme.inputSecondaryColor};
          font-weight: 600;
        }

        .codigo-punto {
          font-size: .75rem;
        }
      }

      .coordenadas-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .coordenadas {
          display: flex;

          .nombre-coordenada {
            display: flex;
            flex-direction: column;
            font-size: .75rem;
          }

          .data-coordenada {
            display: flex;
            flex-direction: column;
            font-size: .75rem;
            margin-left: .5rem;
          }
        }

        .ultimo-registro {
          width: 6rem;
          font-size: .75rem;
        }
      }
    }
  }

  .points-list {
    width: 100%;
    padding-bottom: 0rem;
    padding-right: 0rem;
    min-height: unset;
    margin: 0;
  }
`;
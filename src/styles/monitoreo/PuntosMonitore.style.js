import styled from 'styled-components';

export const PuntosMonitoreoContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 0;

  .points-map-container {
    margin-top: 1rem;
    height: 400px;
    width: 400px;
    background-color: steelblue;

    .leaflet-container {
      width: 100%;
      height: 100%;
    }
  }

  .points-list {
    width: 100%;
    padding-bottom: 0rem;
    padding-right: 0rem;
    min-height: unset;
  }
`;
import styled from 'styled-components';

export const ProyectosContainer = styled.div`
  display: grid;
  grid-template-columns: 23.5% 23.5% 23.5% 23.5%;
  grid-column-gap: 2%;
  grid-row-gap: 1rem;

  .card-proyecto {
    cursor: pointer;
    position: relative;


    img {
      width: 100%;
      height: 200px;
      border-radius: 10px;
      transition: .3s;
      &:hover {
        box-shadow: 0 0 1rem 0 gray;
      }
    }

    .info-glass {
      height: 3.75rem;
      width: 100%;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.5);
      border-radius: 0px 0px 10px 10px;
      position: absolute;
      bottom: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: ${props => props.theme.azulOscuro};

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: .75rem;
        font-weight: 700;
        padding: .25rem;
        line-height: .825rem;
        max-height: 1.5rem;
      }

      span {
        padding: .25rem;
        font-size: .75rem;
        text-align: right;
      }
    }
  }
`;
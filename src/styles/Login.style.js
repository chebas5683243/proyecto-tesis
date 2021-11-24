import styled from "styled-components";
import background from "../assets/fondo.jpg";

export const LoginContainer = styled.div`
  height: 100vh;
  background-color: black;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  
  .glass-container {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 25rem;
    height: fit-content;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(.75rem);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;

    .title-container {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 70px;
      }

      .title {
        margin-left: 5px;
        font-size: 40px;

        .eco {
          font-weight: 700;
          color: ${(props) => !props.isSidebar ? props.theme.palette.primary.main : '#fff'};
        }

        .viewer {
          font-weight: 400;
          color: ${(props) => !props.isSidebar ? props.theme.inputSecondaryColor : '#fff'};
        }
      }
    }

    .subtitulo {
      margin: 10px auto;
      width: 240px;
      display: flex;
      justify-content: center;

      p {
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: ${(props) => !props.isSidebar ? props.theme.inputSecondaryColor : '#fff'};
      }
    }

    .formulario {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 1rem;

      > button {
        margin-top: 1rem;
      }
    }

    .footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      span {
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: ${(props) => !props.isSidebar ? props.theme.inputSecondaryColor : '#fff'};
      }
    }
  }
`;
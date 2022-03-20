import styled from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.white};
  width: 500px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  &.two-sides-modal {
    width: fit-content;
  }

  .title {
    span {
      font-size: 16px;
      font-weight: 700;
      color: ${props => props.theme.inputSecondaryColor};
    }
  }

  .title-centered {
    p {
      font-size: 16px;
      font-weight: 700;
      color: ${props => props.theme.inputSecondaryColor};
      margin: 0 20px 20px 20px;
      text-align: center;
    }
  }

  .two-sides-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
    .fields-section {
      display: flex;
      flex: 1;
      gap: 1.5rem;

      .vertical-line {
        width: 2px;
        background-color: ${props => props.theme.inputSecondaryColor};
      }

      .fields-container {
        width: 400px;
      }

      .parameters {
        padding: 1rem 1.5rem;
        border: 2px solid #555155;
        border-radius: .5rem;
      }
    }
  }

  .fields-container {
    margin: 1.5rem 0;
    margin-bottom: 0;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .buttons-container {
    display: flex;
    align-self: flex-end;

    > * {
      margin-right: 10px;
    }

    button:last-child {
      margin-right: 0;
    }
  }

  .buttons-container-centered {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-top: 1rem;
  }

  .check-field-container {
    display: flex;
    align-items: center;
    gap: .5rem;
  }
`;
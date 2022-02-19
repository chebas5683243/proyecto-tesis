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

  .fields-container {
    margin: 1.5rem 0;
    margin-bottom: 0;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .check-field-container {
      display: flex;
      align-items: center;
    }
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
    justify-content: space-around;
  }

  .check-field-container {
    display: flex;
    gap: .5rem;
  }
`;
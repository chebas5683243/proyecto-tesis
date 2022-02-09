import styled, { keyframes } from "styled-components";

const spin = keyframes`
  100% {
    transform: rotate(180deg);
  } 
`;

const stay = keyframes`
  100% {
    transform: rotate(-180deg);
  } 
`;

export const FormGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  background-color: ${props => props.theme.white};
  box-shadow: 0px 0px 2px #0030A8;
  border-radius: 10px;
  margin-top: 30px;
  z-index: 0;

  .form-header {
    display: flex;
    align-items: center;
    padding: 10px 0;

    span {
      color: ${props => props.theme.inputSecondaryColor};
      font-size: 1.125rem;
      font-weight: 700;
      margin-right: 10px;
    }

    .divider {
      height: 2px;
      flex: 1;
      background-color: ${props => props.theme.inputSecondaryColor};
    }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: ${props => props.theme.inputSecondaryColor};
      cursor: pointer;

      svg {
        color: ${props => props.theme.white};

        &.rotated {
          animation: ${spin} .2s linear forwards;
        }

        &.normal {
          animation: ${stay} .2s linear forwards;
        }
      }
    }
  }

  .inputs-container .MuiCollapse-wrapperInner {
    display: flex;
    flex-wrap: wrap;
    gap: 2%;

    > * {
      margin-bottom: 1.5rem;
    }

    > div:nth-child(1) {
      margin-bottom: 1rem;
    }
  }

  .table-container {
    display: flex;
    flex-direction: column;
    
    .button-left {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
    }

    .table-form {
      width: 95%;
      margin: auto;
      margin-bottom: 40px;
    }

    .empty-message {
      text-align: center;
      margin: 20px 0 30px 0;
    }
  }
`;
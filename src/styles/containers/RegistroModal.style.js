import styled from 'styled-components';

export const RegistroModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  .add-registro-container {
    display: flex;
    flex-direction: column;

    .modal-title {
      color: ${props => props.theme.inputSecondaryColor};
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .modal-text {
      font-size: .875rem;
    }

    .formato-archivo {
      display: flex;
      align-items: center;
      margin: .5rem;
      padding: .5rem;
      width: fit-content;
      border-radius: .5rem;
      gap: .5rem;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
        background-color: gainsboro;
      }
      
      .excel-icon {
        width: 1.75rem;
        height: 1.75rem;
      }

      .excel-nombre {
        color: ${props => props.theme.inputSecondaryColor};
        font-weight: 700;
      }
    }

    .file-input {
      margin-top: 1rem;
      margin-bottom: 2rem;

      input {
        width: 100%;
        font-family: ${props => props.theme.typography.fontFamily};

        &::file-selector-button {
          margin-right: 1rem;
          cursor: pointer;
          user-select: none;
          vertical-align: middle;
          border-radius: 4px;
          font-weight: 500;
          font-family: ${props => props.theme.typography.fontFamily};
          border: none;
          background-color: ${props => props.theme.palette.primary.main};
          padding: .375rem 1rem;
          line-height: 1.75;
          font-size: .875rem;
          color: ${props => props.theme.white};
          box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

          &:hover {
            background-color: #3FBC20;
            box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
          }
        }
      }
    }
  }
`;
import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';
// import { DataGridPro } from '@mui/x-data-grid-pro';

export const DataGridPrimaryStyle = styled(DataGrid)`
  background-color: ${props => props.theme.white};

  .MuiDataGrid-columnHeaders {
    background-color: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.white};
    font-size: 1rem;

    svg {
      color: ${props => props.theme.white};
    }
  }

  .MuiDataGrid-row {
    background-color: ${props => props.theme.white};
    font-size: .875rem;

    button {
      color: ${props => props.theme.inputSecondaryColor};
    }
  }

  /* .MuiDataGrid-main {
    > div:nth-child(3) {
      display: none;
    }
  } */
`;
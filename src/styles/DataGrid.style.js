import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';
// import { DataGridPro } from '@mui/x-data-grid-pro';

export const DataGridPrimaryStyle = styled(DataGrid)`
  background-color: ${props => props.theme.white};

  .MuiDataGrid-overlay.css-163y13e-MuiDataGrid-overlay {
    height: unset !important;
  }

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

      &.Mui-disabled {
        color: ${props => props.theme.gray3};
      }
    }
  }
`;

export const DataGridSecondaryStyle = styled(DataGrid)`
  background-color: ${props => props.theme.white};
  border: none !important;

  .MuiDataGrid-overlay {
    height: inherit !important;
  }

  .MuiDataGrid-columnHeaders {
    border-bottom: ${props => props.theme.palette.primary.main};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.palette.primary.main};

    .MuiDataGrid-columnHeadersInner {
      border-bottom: 2px solid ${props => props.theme.palette.primary.main};
    }

    svg {
      color: ${props => props.theme.palette.primary.main};
    }
  }

  .MuiDataGrid-row {
    background-color: ${props => props.theme.white};
    font-size: .875rem;

    button {
      color: ${props => props.theme.inputSecondaryColor};

      &.Mui-disabled {
        color: ${props => props.theme.gray3};
      }
    }
  }

  .MuiDataGrid-footerContainer {
    display: none;
  }
  
`;
import { GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { DataGridPrimaryStyle } from '../../styles/DataGrid.style';
// import { GridToolbar } from '@mui/x-data-grid-pro';

const EVDataGrid = ({rowHeight, loading, rows, columns, density}) => {

  const [ pageSize, setPageSize ] = useState(10);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGridPrimaryStyle
            rowHeight={rowHeight || 50}
            loading={loading}
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10,25,50,100]}
            density={density ? density : 'compact'}
            hideFooterSelectedRowCount
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            // checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
 
export default EVDataGrid;
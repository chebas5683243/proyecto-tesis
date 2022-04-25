import { Settings } from '@mui/icons-material';
import { DataGridSecondaryStyle } from '../../styles/DataGrid.style';

const EVDataGridSecondary = ({loading, rows, columns}) => {

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGridSecondaryStyle
            loading={loading}
            autoHeight
            rows={rows}
            columns={columns}
            density='compact'
            hideFooterSelectedRowCount
            disableSelectionOnClick
            hideFooterPagination
            components={{
              MoreActionsIcon: Settings
            }}
          />
        </div>
      </div>
    </div>
  );
}
 
export default EVDataGridSecondary;
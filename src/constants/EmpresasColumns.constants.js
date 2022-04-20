import { GridActionsCellItem } from '@mui/x-data-grid';
import { Circle, Delete, Edit, RemoveRedEye, SettingsBackupRestore } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { useDeleteEmpresa, useActivateEmpresa } from '../services/Empresas.service'
import Box from '@mui/material/Box';

export const useColumnsListEmpresas = (fetchEmpresas) => {

  const history = useHistory();

  const { deleteEmpresa } = useDeleteEmpresa();
  const { activateEmpresa } = useActivateEmpresa();
  
  const handleSeeDetails = (selectedId) => {
    history.push("/empresas/" + selectedId);
  }

  const handleEdit = (selectedId) => {
    history.push("/empresas/" + selectedId + "/edit");
  }

  const handleDelete = (selectedId, estado) => {
    if(estado) deleteEmpresa(selectedId, fetchEmpresas);
    else activateEmpresa(selectedId, fetchEmpresas);
  }

  return [
    {
      field: 'ruc',
      headerName: 'RUC',
      type: 'number',
      flex: 1
    },
    {
      field: 'razon_social',
      headerName: 'Razón Social',
      flex: 2
    },
    {
      field: 'tipo_contribuyente',
      headerName: 'Tipo Contribuyente',
      flex: 2
    },
    {
      field: 'domicilio_fiscal',
      headerName: 'Domicilio Fiscal',
      flex: 4,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => (
        params.value ? "Activo" : "Desactivado"
      ),
      renderCell: (params) => (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
          <Circle style={{color: (params.value ? 'lightskyblue' : 'red')}}/>
          <span>{params.value ? "Activo" : "Desactivado"}</span>
        </Box>
      ),
      type: 'singleSelect',
      valueOptions: [0, 1]
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      minWidth: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RemoveRedEye />}
          label="Delete"
          onClick={() => handleSeeDetails(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Delete"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={(params.row.estado ? <Delete /> : <SettingsBackupRestore />)}
          label="Delete"
          onClick={() => handleDelete(params.id, params.row.estado)}
        />,
      ]
    }
  ];
}
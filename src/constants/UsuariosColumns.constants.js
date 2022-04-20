import { GridActionsCellItem } from '@mui/x-data-grid';
import { Circle, Delete, Edit, RemoveRedEye, SettingsBackupRestore } from '@mui/icons-material';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';

export const useColumnsListUsuarios = (fetchEmpresas) => {

  const history = useHistory();
  
  const handleSeeDetails = (selectedId) => {
    history.push("/usuarios/" + selectedId);
  }

  const handleEdit = (selectedId) => {
    history.push("/usuarios/" + selectedId + "/edit");
  }

  return [
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 1
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 3
    },
    {
      field: 'dni',
      headerName: 'DNI',
      flex: 1
    },
    {
      field: 'empresa',
      headerName: 'Empresa',
      flex: 3,
    },
    {
      field: 'cargo',
      headerName: 'Cargo',
      flex: 2,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
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
          //onClick={() => handleDelete(params.id, params.row.estado)}
        />,
      ]
    }
  ];
}
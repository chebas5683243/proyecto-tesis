import { GridActionsCellItem } from '@mui/x-data-grid';
import { Circle, Delete, Edit, RemoveRedEye, SettingsBackupRestore } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { Typography } from '@mui/material';

export const useColumnsListPuntos = (setOpenModal, setSelectedId) => {

  const { setPuntoId } = useContext(ProjectContext);
  
  const handleSeeDetails = (selectedId) => {
    setPuntoId(selectedId);
  }

  const handleEdit = (selectedId) => {
    setSelectedId(selectedId);
    setOpenModal(p => ({
      ...p,
      edit: true
    }));
  }

  const handleActivateDeactivate = (selectedId, estado) => {
    setSelectedId(selectedId);
    const modal = estado ? "deactivate" : "activate";
    setOpenModal(p => ({
      ...p,
      [modal]: true
    }));
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
      flex: 2
    },
    {
      field: 'coordenadas',
      headerName: 'Coordenadas',
      flex: 2,
      renderCell: (params) => (
        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography>Longitud:</Typography>
            <Typography>Latitud:</Typography>
            <Typography>Altitud:</Typography>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: '1rem'}}>
            <Typography>{params.row.longitud}</Typography>
            <Typography>{params.row.latitud}</Typography>
            <Typography>{params.row.altitud}</Typography>
          </div>
        </div>
      ),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => (
        params.value ? "Activo" : "Inactivo"
      ),
      renderCell: (params) => (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
          <Circle style={{color: (params.value ? 'lightskyblue' : 'red')}}/>
          <span>{params.value ? "Activo" : "Inactivo"}</span>
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
          label="Details"
          onClick={() => handleSeeDetails(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={(params.row.estado ? <Delete /> : <SettingsBackupRestore />)}
          label="Delete"
          onClick={() => handleActivateDeactivate(params.id, params.row.estado)}
        />,
      ]
    }
  ];
}
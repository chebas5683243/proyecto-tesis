import { GridActionsCellItem } from '@mui/x-data-grid';
import { Circle, Delete, Edit, RemoveRedEye, SettingsBackupRestore } from '@mui/icons-material';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { renderCellExpand } from '../utils/utils';

export const useColumnsListIncidentes = (setOpenModal, setSelectedId) => {

  const history = useHistory();

  const getRowActions = (params) => {
    let actions = [
      <GridActionsCellItem
        icon={<RemoveRedEye />}
        label="Detalle"
        onClick={() => handleSeeDetails(params.id)}
      />,
      <GridActionsCellItem
        icon={<Edit />}
        label="Editar"
        onClick={() => handleSeeDetails(params.id)}
      />,
    ];
    
    return actions;
  }
  
  const handleSeeDetails = (selectedId) => {
    history.push("/incidentes/" + selectedId);
  }

  const handleEdit = (selectedId) => {
    history.push("/incidentes/" + selectedId + "/edit");
  }

  return [
    {
      field: 'ruc',
      headerName: 'Código',
      flex: 1
    },
    {
      field: 'nombre_tipo_incidente',
      headerName: 'Tipo de Incidente',
      flex: 2
    },
    {
      field: 'proyecto',
      headerName: 'Proyecto',
      flex: 2
    },
    {
      field: 'fecha',
      headerName: 'Fecha y hora',
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
      headerName: '',
      type: 'actions',
      width: 0,
      getActions: (params) => getRowActions(params)
    }
  ];
}

export const useColumnsListCausas = (handleOpenEditCausaModal, handleOpenDeleteCausaModal, setSelectedCausa) => {

  const handleEdit = (causa) => {
    setSelectedCausa(causa);
    handleOpenEditCausaModal();
  }
  
  const handleDelete = (causa) => {
    setSelectedCausa(causa);
    handleOpenDeleteCausaModal();
  }

  return [
    {
      field: 'tipo',
      headerName: 'TIPO DE CAUSA',
      flex: 2
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3,
      renderCell: renderCellExpand,
    },
    {
      field: 'actions',
      headerName: 'ACCIONES',
      type: 'actions',
      minWidth: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Editar"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={(<Delete />)}
          label="Delete"
          onClick={() => handleDelete(params.row)}
        />,
      ]
    }
  ]
}
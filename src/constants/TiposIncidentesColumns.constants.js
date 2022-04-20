import { GridActionsCellItem } from '@mui/x-data-grid';
import { Circle, Delete, Edit, RemoveRedEye, SettingsBackupRestore } from '@mui/icons-material';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';

export const useColumnsListTiposIncidentes = (fetchEmpresas) => {

  const history = useHistory();
  
  const handleSeeDetails = (selectedId) => {
    history.push("/tipoIncidentes/" + selectedId);
  }

  const handleEdit = (selectedId) => {
    history.push("/tipoIncidentes/" + selectedId + "/edit");
  }

  return [
    {
      field: 'nombre',
      headerName: 'Tipo de Incidente',
      flex: 1
    },
    {
      field: 'nparametros',
      headerName: 'Parámetro asociados',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => (
        params.value + (params.value !== 1 ? " parámetros" : " parámetro")
      ),
    },
    {
      field: 'npersonas',
      headerName: 'Personar a alertar',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => (
        params.value + (params.value !== 1 ? " personas" : " persona")
      ),
    },
    {
      field: 'estado_alerta',
      headerName: 'Estado de la alerta',
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

export const useColumnsListCreateParametros = (handleOpenDeleteParametroModal, setSelectedParametro) => {

  const handleDelete = (parametro) => {
    setSelectedParametro(parametro)
    handleOpenDeleteParametroModal();
  }

  return [
    {
      field: 'parametro',
      headerName: 'PARÁMETRO RELACIONADO',
      flex: 2,
      valueFormatter: (params) => params.value.label,
    },
    {
      field: 'actions',
      headerName: 'ACCIONES',
      type: 'actions',
      minWidth: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={(<Delete />)}
          label="Delete"
          onClick={() => handleDelete(params.row)}
        />,
      ]
    }
  ];
}

export const useColumnsListDetalleParametros = () => {

  return [
    {
      field: 'parametro',
      headerName: 'PARÁMETRO RELACIONADO',
      flex: 2,
      valueFormatter: (params) => params.value.label,
    },
  ];
}

export const useColumnsListCreatePersonas = (handleOpenDeletePersonaModal, setSelectedPersona) => {

  const handleDelete = (persona) => {
    setSelectedPersona(persona)
    handleOpenDeletePersonaModal();
  }

  return [
    {
      field: 'nombre_completo',
      headerName: 'NOMBRE DE LA PERSONA',
      flex: 2
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      flex: 2
    },
    {
      field: 'actions',
      headerName: 'ACCIONES',
      type: 'actions',
      minWidth: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={(<Delete />)}
          label="Delete"
          onClick={() => handleDelete(params.row)}
        />,
      ]
    }
  ];
}

export const useColumnsListDetallePersonas = () => {

  return [
    {
      field: 'nombre_completo',
      headerName: 'NOMBRE DE LA PERSONA',
      flex: 2
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      flex: 2
    }
  ];
}
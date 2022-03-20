import { GridActionsCellItem } from '@mui/x-data-grid';
import { AssignmentTurnedIn, Circle, Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { Box } from '@mui/material';

export const useColumnsListProyectos = (fetchProyectos) => {

  const history = useHistory();
  
  const handleSeeDetails = (selectedId) => {
    history.push("/proyectos/" + selectedId);
  }

  const handleEdit = (selectedId) => {
    history.push("/proyectos/" + selectedId + "/edit");
  }

  const handleDelete = (selectedId, estado) => {
    // if(estado) deleteEmpresa(selectedId, fetchProyectos);
    // else activateEmpresa(selectedId, fetchProyectos);
  }

  return [
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 1
    },
    {
      field: 'nombre',
      headerName: 'Nombre del Proyecto',
      flex: 3
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicación',
      flex: 1
    },
    {
      field: 'empresa',
      headerName: 'Empresa Ejecutora',
      flex: 2,
    },
    {
      field: 'fecha_inicio',
      headerName: 'Inicio',
      flex: 1,
    },
    {
      field: 'fecha_fin',
      headerName: 'Fin',
      flex: 1,
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
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.id, params.row.estado)}
        />,
      ]
    }
  ];
}

export const useColumnsListCreateFases = (handleOpenDeleteFaseModal, setSelectedFase) => {

  const handleDelete = (fase) => {
    setSelectedFase(fase)
    handleOpenDeleteFaseModal();
  }

  return [
    {
      field: 'nombre',
      headerName: 'NOMBRE DE LA FASE',
      flex: 2
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3
    },
    {
      field: 'estado',
      headerName: 'ESTADO',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => getStateName(params.value),
      renderCell: (params) => (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
          <Circle style={{color: getStateColor(params.value)}}/>
          <span>{getStateName(params.value)}</span>
        </Box>
      ),
      type: 'singleSelect',
      valueOptions: [0, 1]
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

export const useColumnsListDetalleFases = () => {

  return [
    {
      field: 'nombre',
      headerName: 'NOMBRE DE LA FASE',
      flex: 2
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3
    },
    {
      field: 'inicio',
      headerName: 'INICIO',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: 'fin',
      headerName: 'FIN',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: 'estado',
      headerName: 'ESTADO',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => getStateName(params.value),
      renderCell: (params) => (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
          <Circle style={{color: getStateColor(params.value)}}/>
          <span>{getStateName(params.value)}</span>
        </Box>
      ),
      type: 'singleSelect',
      valueOptions: [1, 2, 3]
    }
  ];
}

export const useColumnsListEditFases = (handleOpenDeleteFaseModal, handleOpenEndFaseModal, setSelectedFase) => {

  const handleDelete = (fase) => {
    setSelectedFase(fase)
    handleOpenDeleteFaseModal();
  }

  const handleEnd = (fase) => {
    setSelectedFase(fase)
    handleOpenEndFaseModal();
  }

  const getRowActions = (params) => {
    let actions = [];
    if(params.row?.estado === 2) {
      actions.push(
        <GridActionsCellItem
          icon={<AssignmentTurnedIn />}
          label="Terminar fase"
          onClick={() => handleEnd(params.row)}
          showInMenu
        />
      ) 
    }

    if(params.row?.estado === 1) {
      actions.push(
        <GridActionsCellItem
          icon={<Delete />}
          label="Eliminar"
          onClick={() => handleDelete(params.row)}
          showInMenu
        />
      )
    }
    
    return actions;
  }

  return [
    {
      field: 'nombre',
      headerName: 'NOMBRE DE LA FASE',
      flex: 2
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3
    },
    {
      field: 'inicio',
      headerName: 'INICIO',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: 'fin',
      headerName: 'FIN',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: 'estado',
      headerName: 'ESTADO',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => getStateName(params.value),
      renderCell: (params) => (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
          <Circle style={{color: getStateColor(params.value)}}/>
          <span>{getStateName(params.value)}</span>
        </Box>
      ),
      type: 'singleSelect',
      valueOptions: [1, 2, 3]
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

const getStateColor = (state) => {
  switch (state) {
    case 1: return 'lightskyblue'
    case 2: return 'yellow'
    case 3: return 'green'
    default: return 'lightskyblue'
  }
}

const getStateName = (state) => {
  switch (state) {
    case 1: return 'Planeado'
    case 2: return 'En progreso'
    case 3: return 'Terminado'
    default: return 'Planeado'
  }
}
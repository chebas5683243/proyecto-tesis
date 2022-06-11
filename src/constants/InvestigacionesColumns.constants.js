import { GridActionsCellItem } from '@mui/x-data-grid';
import { Circle, Delete, Edit } from '@mui/icons-material';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { renderCellExpand } from '../utils/utils';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useColumnsListInvestigaciones = (setOpenModal, setSelectedId, handleExport) => {

  const history = useHistory();

  const { infoUsuario } = useContext(UserContext);

  const getRowActions = (params) => {
    let isCompleted = params.row.estado >= 1;
    let isClosed = params.row.estado === 2;

    let actions = [];

    actions.push(
      <GridActionsCellItem
        label="Ver reporte final"
        onClick={() => handleSeeDetails(params.id)}
        showInMenu
      />
    );

    if (isCompleted) {
      actions.push(
        <GridActionsCellItem
          label="Exportar PDF"
          onClick={() => handleExport(params.id, params.row.codigo)}
          showInMenu
        />
      );
    }

    if (isClosed && infoUsuario.tipo !== 3) {
      actions.push(
        <GridActionsCellItem
          label="Validar reporte"
          onClick={() => handleValidate(params.id)}
          showInMenu
        />
      )
    }

    return actions;
  }

  const handleSeeDetails = (selectedId) => {
    history.push("/investigaciones/" + selectedId);
  }

  const handleValidate = (selectedId) => {
    setSelectedId(selectedId);
    setOpenModal(p => ({
      ...p,
      validate: true
    }));
  }

  const getState = (state) => {
    switch (state) {
      case 0: return 'En investigación'
      case 1: return 'En ejecución de acciones'
      case 2: return 'Cerrado'
      case 3: return 'Verificado'
    }
  }

  const getColorState = (state) => {
    switch (state) {
      case 0: return 'purple'
      case 1: return 'yellow'
      case 2: return 'lightskyblue'
      case 3: return 'lightgreen'
    }
  }

  return [
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 1
    },
    {
      field: 'tipo_incidente',
      headerName: 'Tipo de Incidente',
      flex: 3
    },
    {
      field: 'proyecto',
      headerName: 'Proyecto',
      flex: 3
    },
    {
      field: 'fecha_incidente',
      headerName: 'Fecha',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <Circle style={{ color: getColorState(params.value) }} />
          <span>{getState(params.value)}</span>
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

export const useColumnsListImpactos = (handleOpenEditImpactoModal, handleOpenDeleteImpactoModal, setSelectedImpacto) => {

  const handleEdit = (impacto) => {
    setSelectedImpacto(impacto);
    handleOpenEditImpactoModal();
  }

  const handleDelete = (impacto) => {
    setSelectedImpacto(impacto);
    handleOpenDeleteImpactoModal();
  }

  return [
    {
      field: 'tipo',
      headerName: 'DAÑO O IMPACTO AMBIENTAL',
      flex: 2,
      valueFormatter: (params) => params.value.label
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

export const useColumnsListDetalleImpactos = () => {

  return [
    {
      field: 'tipo',
      headerName: 'DAÑO O IMPACTO AMBIENTAL',
      flex: 2,
      valueFormatter: (params) => params.value.label
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3,
      renderCell: renderCellExpand,
    }
  ]
}

export const useColumnsListPersona = (handleOpenEditPersonaModal, handleOpenDeletePersonaModal, setSelectedPersona) => {

  const handleEdit = (persona) => {
    setSelectedPersona(persona);
    handleOpenEditPersonaModal();
  }

  const handleDelete = (persona) => {
    setSelectedPersona(persona);
    handleOpenDeletePersonaModal();
  }

  return [
    {
      field: 'nombre_completo',
      headerName: 'PERSONA',
      flex: 3,
    },
    {
      field: 'dni',
      headerName: 'DNI',
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 6,
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

export const useColumnsListDetallePersona = () => {

  return [
    {
      field: 'nombre_completo',
      headerName: 'PERSONA',
      flex: 3,
    },
    {
      field: 'dni',
      headerName: 'DNI',
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 6,
      renderCell: renderCellExpand,
    }
  ]
}

export const useColumnsListAcciones = (handleOpenEditAccionModal, handleOpenDeleteAccionModal, setSelectedAccion, goNextStateAccion) => {

  const { infoUsuario } = useContext(UserContext);

  const handleEdit = (accion) => {
    setSelectedAccion(accion);
    handleOpenEditAccionModal();
  }

  const handleDelete = (accion) => {
    setSelectedAccion(accion);
    handleOpenDeleteAccionModal();
  }

  const handleGoNextStep = (accion) => {
    console.log(accion)
    goNextStateAccion(accion);
  }

  const getRowActions = (params) => {
    const isInProgress = params.row.estado === 0;
    const isExecuted = params.row.estado === 1;

    const actions = [];

    if (isInProgress || isExecuted) {
      actions.push(
        <GridActionsCellItem
          label="Editar"
          onClick={() => handleEdit(params.id)}
          showInMenu
        />
      );
    }

    if (isExecuted && infoUsuario.tipo !== 3) {
      actions.push(
        <GridActionsCellItem
          label="Verificar"
          onClick={() => handleGoNextStep(params.row)}
          showInMenu
        />
      );
    }

    if (isInProgress) {
      actions.push(
        <GridActionsCellItem
          label="Ejecutar"
          onClick={() => handleGoNextStep(params.row)}
          showInMenu
        />
      );

      actions.push(
        <GridActionsCellItem
          label="Eliminar"
          onClick={() => handleDelete(params.id)}
          showInMenu
        />
      );
    }

    return actions;
  }

  const getState = (state) => {
    switch (state) {
      case 0: return 'En proceso'
      case 1: return 'Ejecutado'
      case 2: return 'Verificado'
    }
  }

  const getColorState = (state) => {
    switch (state) {
      case 0: return 'yellow'
      case 1: return 'lightskyblue'
      case 2: return 'lightgreen'
    }
  }

  return [
    {
      field: 'order',
      headerName: 'N°',
      width: 0,
      align: 'center'
    },
    {
      field: 'tipo',
      headerName: 'TIPO',
      flex: 1,
      valueFormatter: (params) => params.value.label
    },
    {
      field: 'responsable',
      headerName: 'RESPONSABLE',
      flex: 3,
      valueFormatter: (params) => params.value.label
    },
    {
      field: 'fecha_planeada',
      headerName: 'FIN',
      flex: 1,
    },
    {
      field: 'estado',
      headerName: 'ESTADO',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <Circle style={{ color: getColorState(params.value) }} />
          <span>{getState(params.value)}</span>
        </Box>
      ),
      type: 'singleSelect',
      valueOptions: [0, 1, 2]
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3,
      renderCell: renderCellExpand,
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      width: 0,
      getActions: (params) => getRowActions(params)
    }
  ]
}

export const useColumnsListDetalleAcciones = () => {

  const getState = (state) => {
    switch (state) {
      case 0: return 'En proceso'
      case 1: return 'Ejecutado'
      case 2: return 'Verificado'
    }
  }

  const getColorState = (state) => {
    switch (state) {
      case 0: return 'yellow'
      case 1: return 'lightskyblue'
      case 2: return 'lightgreen'
    }
  }

  return [
    {
      field: 'order',
      headerName: 'N°',
      width: 0,
      align: 'center'
    },
    {
      field: 'tipo',
      headerName: 'TIPO',
      flex: 1,
      valueFormatter: (params) => params.value.label
    },
    {
      field: 'responsable',
      headerName: 'RESPONSABLE',
      flex: 3,
      valueFormatter: (params) => params.value.label
    },
    {
      field: 'fecha_planeada',
      headerName: 'FIN',
      flex: 1,
    },
    {
      field: 'estado',
      headerName: 'ESTADO',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <Circle style={{ color: getColorState(params.value) }} />
          <span>{getState(params.value)}</span>
        </Box>
      ),
      type: 'singleSelect',
      valueOptions: [0, 1, 2]
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3,
      renderCell: renderCellExpand,
    }
  ]
}
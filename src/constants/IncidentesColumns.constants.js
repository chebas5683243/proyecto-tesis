import { GridActionsCellItem } from '@mui/x-data-grid';
import { Circle, Delete, Edit } from '@mui/icons-material';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { renderCellExpand } from '../utils/utils';

export const useColumnsListIncidentes = (handleExport) => {

  const history = useHistory();

  const getRowActions = (params) => {
    let hasInvestigation = params.row.estado === 1;

    let actions = [];

    if (!hasInvestigation) {
      actions = [
        <GridActionsCellItem
          label="Crear reporte final"
          onClick={() => handleCreateInvestigacion(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Editar"
          onClick={() => handleEdit(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Detalle"
          onClick={() => handleSeeDetails(params.id)}
          showInMenu
        />
      ];
    }
    else {
      actions = [
        <GridActionsCellItem
          label="Ver reporte final"
          onClick={() => handleSeeInvestigacion(params.row.investigation_id)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Detalle"
          onClick={() => handleSeeDetails(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Exportar PDF"
          onClick={() => handleExport(params.id, params.row.codigo)}
          showInMenu
        />
      ];
    }
    
    return actions;
  }

  const handleSeeInvestigacion = (investigacionId) => {
    history.push(`/investigaciones/${investigacionId}`);
  }
  
  const handleSeeDetails = (selectedId) => {
    history.push("/incidentes/" + selectedId);
  }

  const handleCreateInvestigacion = (selectedId) => {
    history.push("/incidentes/" + selectedId + "/investigacion");
  }

  const handleEdit = (selectedId) => {
    history.push("/incidentes/" + selectedId + "/edit");
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
        <Box sx={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
          <Circle style={{color: (params.value ? 'lightskyblue' : 'yellow')}}/>
          <span>{params.value ? "Reporte final creado" : "Sin reporte final"}</span>
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

export const useColumnsListDetalleCausas = () => {

  return [
    {
      field: 'tipo',
      headerName: 'TIPO DE CAUSA',
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

export const useColumnsListAccionesInmediatas = (handleOpenEditAccionesInmediatasModal, handleOpenDeleteAccionesInmediatasModal, setSelectedAccionInmediata) => {

  const handleEdit = (causa) => {
    setSelectedAccionInmediata(causa);
    handleOpenEditAccionesInmediatasModal();
  }
  
  const handleDelete = (causa) => {
    setSelectedAccionInmediata(causa);
    handleOpenDeleteAccionesInmediatasModal();
  }

  return [
    {
      field: 'responsable',
      headerName: 'RESPONSABLE',
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

export const useColumnsListDetalleAccionesInmediatas = () => {

  return [
    {
      field: 'responsable',
      headerName: 'RESPONSABLE',
      flex: 2,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      flex: 3,
      renderCell: renderCellExpand,
    }
  ]
}
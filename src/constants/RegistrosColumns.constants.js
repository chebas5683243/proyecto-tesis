import { GridActionsCellItem } from '@mui/x-data-grid';
import { RemoveRedEye } from '@mui/icons-material';
import { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { Typography } from '@mui/material';
import { getColoresCategoria, getColoresParametrizacion } from '../utils/colors';

export const useColumnsListRegistros = () => {

  const { setRegistroId } = useContext(ProjectContext);
  
  const handleSeeDetails = (selectedId) => {
    setRegistroId(selectedId);
  }

  return [
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 1
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha y hora',
      flex: 1
    },
    {
      field: 'parametros_considerados',
      headerName: 'Param. registrados',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Typography style={{fontSize: '.875rem'}}>{params.row.parametros_considerados} de {params.row.total_parametros}</Typography>
          <Typography style={{fontSize: '.875rem'}}>parámetros considerados</Typography>
        </div>
      ),
    },
    {
      field: 'registrado_por',
      headerName: 'Registrado por',
      flex: 2,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      minWidth: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RemoveRedEye />}
          label="Details"
          onClick={() => handleSeeDetails(params.id)}
        />
      ]
    }
  ];
}

export const useColumnsListReporteRegistro = () => {
  return [
    {
      field: 'numero',
      headerName: 'N°',
      minWidth: 10,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'nombre',
      headerName: 'Parámetro',
      flex: 2
    },
    {
      field: 'parametrizacion',
      headerName: 'Parametrización',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const { fontColor, backgroundColor } = getColoresParametrizacion(params.value);
        return (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: backgroundColor, color: fontColor, width: 80, height: 30, borderRadius: 4  }}>
            <Typography style={{fontSize: '.875rem', fontWeight: 600}}>{params.value}</Typography>
          </div>
        )
      },
    },
    {
      field: 'valor',
      headerName: 'Valor Registrado',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'etiqueta',
      headerName: 'Etiqueta/Categoría',
      flex: 2,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        if (!params.value) return "-";
        if (!params.value.tipo) return "-";
        const { fontColor, backgroundColor } = getColoresCategoria(params.row.parametrizacion, params.value?.tipo);
        return (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: backgroundColor, color: fontColor, padding: '0 .5rem', height: 30, borderRadius: 4  }}>
            <Typography style={{fontSize: '.875rem', fontWeight: 600}}>{params.value?.info}</Typography>
          </div>
        )
      },
    },
  ];
}
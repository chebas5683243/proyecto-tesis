import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';

export const useColumnsListParametros = ( setOpenModal, setSelectedId) => {

  const handleEdit = (selectedId) => {
    setSelectedId(selectedId);
    setOpenModal(p => ({
      ...p,
      edit: true
    }));
  }

  const handleDelete = (selectedId) => {
    setSelectedId(selectedId);
    setOpenModal(p => ({
      ...p,
      delete: true
    }));
  }

  return [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 2
    },
    {
      field: 'nombre_corto',
      headerName: 'Nombre Corto',
      flex: 1
    },
    {
      field: 'unidadMedida',
      headerName: 'Unidad de medida',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      minWidth: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ]
    }
  ];
}
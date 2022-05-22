import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useColumnsListAccionesInmediatas, useColumnsListDetalleAccionesInmediatas } from "../../../../constants/IncidentesColumns.constants";
import { CreateFasesContainer } from "../../../../styles/proyectos/CreateFases.style";
import EVButton from "../../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../../atoms/EVDataGridSecondary.atom";
import AddAccionInmediataModal from "./AddAccionInmediataModal.molecule";
import EditAccionInmediataModal from "./EditAccionInmediataModal.molecule";
import DeleteAccionInmediataModal from "./DeleteAccionInmediataModal.molecule";

const AccionesInmediatas = ({disabled, acciones, setValues}) => {

  const [selectedAccion, setSelectedAccion] = useState(null);

  const [ openModal, setOpenModal ] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const handleCloseModal = (modal) => {
    setOpenModal(p => ({
      ...p,
      [modal]: false
    }));
  }

  const handleOpenCreateAccionModal = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }));
  }

  const handleOpenEditAccionModal = () => {
    setOpenModal(p => ({
      ...p,
      edit: true
    }));
  }

  const handleOpenDeleteAccionModal = () => {
    setOpenModal(p => ({
      ...p,
      delete: true
    }));
  }

  const addAccion = (nuevaAccion) => {
    setValues(p => ({
      ...p,
      acciones_inmediatas: [...acciones, nuevaAccion]
    }))
  }
  
  const editAccion = (modifiedAccion) => {
    const nuevasAcciones = [...acciones];
    let index = nuevasAcciones.findIndex(accion => accion.id === modifiedAccion.id);
    nuevasAcciones[index] = modifiedAccion;
    setValues(p => ({
      ...p,
      acciones_inmediatas: nuevasAcciones
    }));
  }

  const deleteAccion = () => {
    const deletedAccion = {...selectedAccion};
    if(deletedAccion.created) {
      setValues(p => ({
        ...p,
        acciones_inmediatas: acciones.filter(accion => {
          return accion.id !== deletedAccion.id;
        })
      }))
    }
    else {
      let remainingAcciones = [...acciones];
      remainingAcciones.forEach(accion => {
        if(accion.id === deletedAccion.id) accion.deleted = true;
      })
      setValues(p => ({
        ...p,
        acciones_inmediatas: remainingAcciones
      }))
    }
    setSelectedAccion(null);
  }
  

  const columnasEdit = useColumnsListAccionesInmediatas(handleOpenEditAccionModal, handleOpenDeleteAccionModal, setSelectedAccion);
  const columnasDetalle = useColumnsListDetalleAccionesInmediatas();

  return (
    <CreateFasesContainer>
      {disabled ? null :
        <EVButton
          label="Agregar accion"
          variant="outlined"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleOpenCreateAccionModal}
        />
      }
      <EVDataGridSecondary
        columns={disabled ? columnasDetalle : columnasEdit}
        rows={acciones.filter(accion => {
          return !accion.deleted;
        })}
      />
      <AddAccionInmediataModal open={openModal.create} handleCloseModal={handleCloseModal} addAccion={addAccion} />
      <EditAccionInmediataModal open={openModal.edit} handleCloseModal={handleCloseModal} accion={selectedAccion} setSelectedAccion={setSelectedAccion} editAccion={editAccion} />
      <DeleteAccionInmediataModal open={openModal.delete} handleCloseModal={handleCloseModal} deleteAccion={deleteAccion} />
    </CreateFasesContainer>
  );
}
 
export default AccionesInmediatas;
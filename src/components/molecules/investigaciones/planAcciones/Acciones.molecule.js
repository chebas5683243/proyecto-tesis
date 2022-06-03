import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useColumnsListDetalleAcciones, useColumnsListAcciones } from "../../../../constants/InvestigacionesColumns.constants";
import { useFetchTiposAcciones } from "../../../../services/TiposAcciones.service";
import { CreateFasesContainer } from "../../../../styles/proyectos/CreateFases.style";
import EVButton from "../../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../../atoms/EVDataGridSecondary.atom";
import AddAccionModal from "./AddAccionModal.molecule";
import DeleteAccionModal from "./DeleteAccionModal.molecule";
import EditAccionModal from "./EditAccionModal.molecule";

const Acciones = ({disabled, acciones, setValues}) => {

  const [selectedAccion, setSelectedAccion] = useState(null);

  const { tiposAccion } = useFetchTiposAcciones();

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
      acciones: [...acciones, nuevaAccion]
    }))
  }
  
  const editAccion = (modifiedAccion) => {
    const nuevasAcciones = [...acciones];
    let index = nuevasAcciones.findIndex(accion => accion.id === modifiedAccion.id);
    nuevasAcciones[index] = modifiedAccion;
    setValues(p => ({
      ...p,
      acciones: nuevasAcciones
    }));
  }

  const deleteAccion = () => {
    const deletedAccion = {...selectedAccion};
    if(deletedAccion.created) {
      setValues(p => ({
        ...p,
        acciones: acciones.filter(accion => {
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
        acciones: remainingAcciones
      }))
    }
    setSelectedAccion(null);
  }

  const goNextStateAccion = (accion) => {
    const nuevasAcciones = [...acciones];
    let index = nuevasAcciones.findIndex(a => a.id === accion.id);
    accion.estado = accion.estado + 1;
    accion.edited = true;
    nuevasAcciones[index] = accion;
    setValues(p => ({
      ...p,
      acciones: nuevasAcciones
    }));
  }

  const columnasEdit = useColumnsListAcciones(handleOpenEditAccionModal, handleOpenDeleteAccionModal, setSelectedAccion, goNextStateAccion);
  const columnasDetalle = useColumnsListDetalleAcciones();

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
        }).map((accion, index) => ({...accion, order: index+1}))}
      />
      <AddAccionModal open={openModal.create} handleCloseModal={handleCloseModal} addAccion={addAccion} tiposAccion={tiposAccion}/>
      <EditAccionModal open={openModal.edit} handleCloseModal={handleCloseModal} tiposAccion={tiposAccion} accion={selectedAccion} setSelectedAccion={setSelectedAccion} editAccion={editAccion} />
      <DeleteAccionModal open={openModal.delete} handleCloseModal={handleCloseModal} deleteAccion={deleteAccion} />
    </CreateFasesContainer>
  );
}
 
export default Acciones;
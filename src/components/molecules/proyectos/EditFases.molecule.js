import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useColumnsListEditFases } from "../../../constants/ProyectosColumns.constants";
import { CreateFasesContainer } from "../../../styles/proyectos/CreateFases.style";
import EVButton from "../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../atoms/EVDataGridSecondary.atom";
import AddFaseModal from "./AddFaseModal.molecule";
import DeleteConfirmationModal from "./DeleteConfirmationModal.molecule";
import EndFaseModal from "./EndFaseModal.molecule";

const EditFases = ({fases, setValues}) => {

  const [selectedFase, setSelectedFase] = useState(null);

  const [ openModal, setOpenModal ] = useState({
    create: false,
    delete: false,
    end: false,
  });

  const handleCloseModal = (modal) => {
    setOpenModal(p => ({
      ...p,
      [modal]: false
    }));
  }

  const handleOpenCreateFaseModal = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }));
  }

  const handleOpenDeleteFaseModal = () => {
    setOpenModal(p => ({
      ...p,
      delete: true
    }));
  }

  const handleOpenEndFaseModal = () => {
    setOpenModal(p => ({
      ...p,
      end: true
    }));
  }

  const addFase = (nuevaFase) => {
    setValues(p => ({
      ...p,
      fases: [...fases, nuevaFase]
    }))
  }

  const deleteFase = (deletedFase) => {
    if(deletedFase.created) {
      setValues(p => ({
        ...p,
        fases: fases.filter(fase => {
          return fase.id !== deletedFase.id;
        })
      }))
    }
    else {
      let remainingFases = [...fases];
      remainingFases.map(fase => {
        if(fase.id === deletedFase.id) fase.deleted = true;
      })
      setValues(p => ({
        ...p,
        fases: remainingFases
      }))
    }
  }

  const endFase = (endedFase) => {
    let modifiedFases = [...fases];
    let setEnProgreso = false;
    modifiedFases.map(fase => {
      if(setEnProgreso && !fase.deleted) {
        fase.estado = 2;
        setEnProgreso = false;
      }
      if(fase.id === endedFase.id){
        fase.estado = 3;
        setEnProgreso = true;
      }
    })
    setValues(p => ({
      ...p,
      estado: setEnProgreso ? 2 : 1,
      fases: modifiedFases
    }))
  }

  const columnasEdit = useColumnsListEditFases(handleOpenDeleteFaseModal, handleOpenEndFaseModal, setSelectedFase);

  return (
    <CreateFasesContainer>
      <EVButton
        label="Agregar fase"
        variant="outlined"
        startIcon={<Add style={{ fontSize: 24 }}/>}
        onClick={handleOpenCreateFaseModal}
      />
      <EVDataGridSecondary
        columns={columnasEdit}
        rows={fases.filter(fase => {
          return !fase.deleted;
        })}
      />
      <AddFaseModal open={openModal.create} handleCloseModal={handleCloseModal} addFase={addFase}/>
      <DeleteConfirmationModal open={openModal.delete} handleCloseModal={handleCloseModal} fase={selectedFase} setSelectedFase={setSelectedFase} deleteFase={deleteFase}/>
      <EndFaseModal open={openModal.end} handleCloseModal={handleCloseModal} fase={selectedFase} setSelectedFase={setSelectedFase} endFase={endFase}/>
    </CreateFasesContainer>
  );
}
 
export default EditFases;
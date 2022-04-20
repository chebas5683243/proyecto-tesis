import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useColumnsListCreateFases, useColumnsListDetalleFases } from "../../../constants/ProyectosColumns.constants";
import { CreateFasesContainer } from "../../../styles/proyectos/CreateFases.style";
import EVButton from "../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../atoms/EVDataGridSecondary.atom";
import AddFaseModal from "./AddFaseModal.molecule";
import DeleteConfirmationModal from "./DeleteConfirmationModal.molecule";

const CreateFases = ({disabled, fases, setValues}) => {

  const [selectedFase, setSelectedFase] = useState(null);

  const [ openModal, setOpenModal ] = useState({
    create: false,
    delete: false,
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

  const addFase = (nuevaFase) => {
    setValues(p => ({
      ...p,
      fases: [...fases, nuevaFase]
    }))
  }

  const deleteFase = (deletedFase) => {
    setValues(p => ({
      ...p,
      fases: fases.filter(fase => {
        return fase.id !== deletedFase.id;
      })
    }))
  }

  const columnasDetalle = useColumnsListDetalleFases();
  const columnasCreate = useColumnsListCreateFases(handleOpenDeleteFaseModal, setSelectedFase);

  return (
    <CreateFasesContainer>
      {disabled ? null :
        <EVButton
          label="Agregar fase"
          variant="outlined"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleOpenCreateFaseModal}
        />
      }
      <EVDataGridSecondary
        columns={disabled ? columnasDetalle : columnasCreate}
        rows={fases}
      />
      <AddFaseModal open={openModal.create} handleCloseModal={handleCloseModal} addFase={addFase}/>
      <DeleteConfirmationModal open={openModal.delete} handleCloseModal={handleCloseModal} fase={selectedFase} setSelectedFase={setSelectedFase} deleteFase={deleteFase}/>
    </CreateFasesContainer>
  );
}
 
export default CreateFases;
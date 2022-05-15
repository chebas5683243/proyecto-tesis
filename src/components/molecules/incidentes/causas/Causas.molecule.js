import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useColumnsListCausas } from "../../../../constants/IncidentesColumns.constants";
import { CreateFasesContainer } from "../../../../styles/proyectos/CreateFases.style";
import EVButton from "../../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../../atoms/EVDataGridSecondary.atom";
import AddCausaModal from "./AddCausaModal.molecule";
import DeleteCausaModal from "./DeleteCausaModal.molecule";
import EditCausaModal from "./EditCausaModal.molecule";

const Causas = ({disabled, causas, setValues}) => {

  const [selectedCausa, setSelectedCausa] = useState(null);

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

  const handleOpenCreateCausaModal = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }));
  }

  const handleOpenEditCausaModal = () => {
    setOpenModal(p => ({
      ...p,
      edit: true
    }));
  }

  const handleOpenDeleteCausaModal = () => {
    setOpenModal(p => ({
      ...p,
      delete: true
    }));
  }

  const addCausa = (nuevaCausa) => {
    setValues(p => ({
      ...p,
      causas: [...causas, nuevaCausa]
    }))
  }
  
  const editCausa = (modifiedCausa) => {
    const nuevasCausas = [...causas];
    let index = nuevasCausas.findIndex(causa => causa.id === modifiedCausa.id);
    nuevasCausas[index] = modifiedCausa;
    setValues(p => ({
      ...p,
      causas: nuevasCausas
    }));
  }

  const deleteCausa = () => {
    const deletedCausa = {...selectedCausa};
    if(deletedCausa.created) {
      setValues(p => ({
        ...p,
        causas: causas.filter(causa => {
          return causa.id !== deletedCausa.id;
        })
      }))
    }
    else {
      let remainingCausas = [...causas];
      remainingCausas.forEach(causa => {
        if(causa.id === deletedCausa.id) causa.deleted = true;
      })
      setValues(p => ({
        ...p,
        causas: remainingCausas
      }))
    }
    setSelectedCausa(null);
  }

  const columnasDetalle = useColumnsListCausas(handleOpenEditCausaModal, handleOpenDeleteCausaModal, setSelectedCausa);

  return (
    <CreateFasesContainer>
      {disabled ? null :
        <EVButton
          label="Agregar causa"
          variant="outlined"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleOpenCreateCausaModal}
        />
      }
      <EVDataGridSecondary
        columns={columnasDetalle}
        rows={causas.filter(causa => {
          return !causa.deleted;
        })}
      />
      <AddCausaModal open={openModal.create} handleCloseModal={handleCloseModal} addCausa={addCausa} />
      <EditCausaModal open={openModal.edit} handleCloseModal={handleCloseModal} causa={selectedCausa} setSelectedCausa={setSelectedCausa} editCausa={editCausa} />
      <DeleteCausaModal open={openModal.delete} handleCloseModal={handleCloseModal} deleteCausa={deleteCausa} />
    </CreateFasesContainer>
  );
}
 
export default Causas;
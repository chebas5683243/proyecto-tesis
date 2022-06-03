import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useColumnsListDetalleImpactos, useColumnsListImpactos } from "../../../../constants/InvestigacionesColumns.constants";
import { useFetchTiposImpactos } from "../../../../services/TiposImpactos.service";
import { CreateFasesContainer } from "../../../../styles/proyectos/CreateFases.style";
import EVButton from "../../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../../atoms/EVDataGridSecondary.atom";
import AddImpactoModal from "./AddImpactoModal.molecule";
import DeleteImpactoModal from "./DeleteImpactoModal.molecule";
import EditImpactoModal from "./EditImpactoModal.molecule";

const Impactos = ({disabled, impactos, setValues}) => {

  const [selectedImpacto, setSelectedImpacto] = useState(null);

  const { tiposImpacto } = useFetchTiposImpactos();

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

  const handleOpenCreateImpactoModal = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }));
  }

  const handleOpenEditImpactoModal = () => {
    setOpenModal(p => ({
      ...p,
      edit: true
    }));
  }

  const handleOpenDeleteImpactoModal = () => {
    setOpenModal(p => ({
      ...p,
      delete: true
    }));
  }

  const addImpacto = (nuevaImpacto) => {
    setValues(p => ({
      ...p,
      impactos: [...impactos, nuevaImpacto]
    }))
  }
  
  const editImpacto = (modifiedImpacto) => {
    const nuevasImpactos = [...impactos];
    let index = nuevasImpactos.findIndex(impacto => impacto.id === modifiedImpacto.id);
    nuevasImpactos[index] = modifiedImpacto;
    setValues(p => ({
      ...p,
      impactos: nuevasImpactos
    }));
  }

  const deleteImpacto = () => {
    const deletedImpacto = {...selectedImpacto};
    if(deletedImpacto.created) {
      setValues(p => ({
        ...p,
        impactos: impactos.filter(impacto => {
          return impacto.id !== deletedImpacto.id;
        })
      }))
    }
    else {
      let remainingImpactos = [...impactos];
      remainingImpactos.forEach(impacto => {
        if(impacto.id === deletedImpacto.id) impacto.deleted = true;
      })
      setValues(p => ({
        ...p,
        impactos: remainingImpactos
      }))
    }
    setSelectedImpacto(null);
  }

  const columnasEdit = useColumnsListImpactos(handleOpenEditImpactoModal, handleOpenDeleteImpactoModal, setSelectedImpacto);
  const columnasDetalle = useColumnsListDetalleImpactos();

  return (
    <CreateFasesContainer>
      {disabled ? null :
        <EVButton
          label="Agregar impacto"
          variant="outlined"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleOpenCreateImpactoModal}
        />
      }
      <EVDataGridSecondary
        columns={disabled ? columnasDetalle : columnasEdit}
        rows={impactos.filter(impacto => {
          return !impacto.deleted;
        })}
      />
      <AddImpactoModal open={openModal.create} handleCloseModal={handleCloseModal} addImpacto={addImpacto} tiposImpacto={tiposImpacto}/>
      <EditImpactoModal open={openModal.edit} handleCloseModal={handleCloseModal} tiposImpacto={tiposImpacto} impacto={selectedImpacto} setSelectedImpacto={setSelectedImpacto} editImpacto={editImpacto} />
      <DeleteImpactoModal open={openModal.delete} handleCloseModal={handleCloseModal} deleteImpacto={deleteImpacto} />
    </CreateFasesContainer>
  );
}
 
export default Impactos;
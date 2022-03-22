import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useColumnsListCreateParametros, useColumnsListDetalleParametros } from "../../../constants/TiposIncidentesColumns.constants";
import { CreateFasesContainer } from "../../../styles/proyectos/CreateFases.style";
import EVButton from "../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../atoms/EVDataGridSecondary.atom";
import AddParametroModal from "./AddParametroModal.molecule";
import DeleteParametro from "./DeleteParametro.molecule";

const CreateParametros = ({disabled, parametros, setValues}) => {

  const [selectedParametro, setSelectedParametro] = useState(null);

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

  const handleOpenCreateParametroModal = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }));
  }

  const handleOpenDeleteParametroModal = () => {
    setOpenModal(p => ({
      ...p,
      delete: true
    }));
  }

  const addParametro = (nuevaParametro) => {
    setValues(p => ({
      ...p,
      parametros: [...parametros, nuevaParametro]
    }))
  }

  const deleteParametro = (deletedParametro) => {
    if(deletedParametro.creado) {
      setValues(p => ({
        ...p,
        parametros: parametros.filter(parametro => {
          return parametro.id !== deletedParametro.id;
        })
      }))
    }
    else {
      let remainingParametros = [...parametros];
      remainingParametros.forEach(parametro => {
        if(parametro.id === deletedParametro.id) parametro.eliminado = true;
      });
      setValues(p => ({
        ...p,
        parametros: remainingParametros
      }))
    }
  }

  const columnasDetalle = useColumnsListDetalleParametros();
  const columnasCreate = useColumnsListCreateParametros(handleOpenDeleteParametroModal, setSelectedParametro);

  return (
    <CreateFasesContainer>
      {disabled ? null :
        <EVButton
          label="Agregar parámetro"
          variant="outlined"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleOpenCreateParametroModal}
        />
      }
      <EVDataGridSecondary
        columns={disabled ? columnasDetalle : columnasCreate}
        rows={parametros.filter(parametro => {
          return !parametro.eliminado;
        })}
      />
      <AddParametroModal open={openModal.create} handleCloseModal={handleCloseModal} addParametro={addParametro}/>
      <DeleteParametro open={openModal.delete} handleCloseModal={handleCloseModal} parametro={selectedParametro} setSelectedParametro={setSelectedParametro} deleteParametro={deleteParametro}/>
    </CreateFasesContainer>
  );
}
 
export default CreateParametros;
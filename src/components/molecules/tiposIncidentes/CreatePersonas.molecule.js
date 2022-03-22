import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useColumnsListCreatePersonas, useColumnsListDetallePersonas } from "../../../constants/TiposIncidentesColumns.constants";
import { CreateFasesContainer } from "../../../styles/proyectos/CreateFases.style";
import EVButton from "../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../atoms/EVDataGridSecondary.atom";
import AddPersonaModal from "./AddPersonaModal.molecule";
import DeletePersona from "./DeletePersona.molecule";

const CreatePersonas = ({disabled, personas_alertas, setValues}) => {

  const [selectedPersona, setSelectedPersona] = useState(null);

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

  const handleOpenCreatePersonaModal = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }));
  }

  const handleOpenDeletePersonaModal = () => {
    setOpenModal(p => ({
      ...p,
      delete: true
    }));
  }

  const addPersona = (nuevaPersona) => {
    setValues(p => ({
      ...p,
      personas_alertas: [...personas_alertas, nuevaPersona]
    }))
  }

  const deletePersona = (deletedPersona) => {
    if(deletedPersona.creado) {
      setValues(p => ({
        ...p,
        personas_alertas: personas_alertas.filter(persona => {
          return persona.id !== deletedPersona.id;
        })
      }))
    }
    else {
      let remainingPersonas = [...personas_alertas];
      remainingPersonas.forEach(persona => {
        if(persona.id === deletedPersona.id) persona.eliminado = true;
      });
      setValues(p => ({
        ...p,
        personas_alertas: remainingPersonas
      }))
    }
  }

  const columnasDetalle = useColumnsListDetallePersonas();
  const columnasCreate = useColumnsListCreatePersonas(handleOpenDeletePersonaModal, setSelectedPersona);

  return (
    <CreateFasesContainer>
      {disabled ? null :
        <EVButton
          label="Agregar persona"
          variant="outlined"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleOpenCreatePersonaModal}
        />
      }
      <EVDataGridSecondary
        columns={disabled ? columnasDetalle : columnasCreate}
        rows={personas_alertas.filter(persona => {
          return !persona.eliminado;
        })}
      />
      <AddPersonaModal open={openModal.create} handleCloseModal={handleCloseModal} addPersona={addPersona}/>
      <DeletePersona open={openModal.delete} handleCloseModal={handleCloseModal} persona={selectedPersona} setSelectedPersona={setSelectedPersona} deletePersona={deletePersona}/>
    </CreateFasesContainer>
  );
}
 
export default CreatePersonas;
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { CreateFasesContainer } from "../../../../styles/proyectos/CreateFases.style";
import EVButton from "../../../atoms/EVButton.atom";
import EVDataGridSecondary from "../../../atoms/EVDataGridSecondary.atom";
import AddPersonaModal from "./AddPersonaModal.molecule";
import EditPersonaModal from "./EditPersonaModal.molecule";
import DeletePersonaModal from "./DeletePersonaModal.molecule";
import { useColumnsListDetallePersona, useColumnsListPersona } from "../../../../constants/InvestigacionesColumns.constants";

const PersonasAfectadas = ({disabled, personas, setValues}) => {

  const [selectedPersona, setSelectedPersona] = useState(null);

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

  const handleOpenCreatePersonaModal = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }));
  }

  const handleOpenEditPersonaModal = () => {
    setOpenModal(p => ({
      ...p,
      edit: true
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
      personas: [...personas, nuevaPersona]
    }))
  }
  
  const editPersona = (modifiedPersona) => {
    const nuevosPersonas = [...personas];
    let index = nuevosPersonas.findIndex(persona => persona.id === modifiedPersona.id);
    nuevosPersonas[index] = modifiedPersona;
    setValues(p => ({
      ...p,
      personas: nuevosPersonas
    }));
  }

  const deletePersona = () => {
    const deletedPersona = {...selectedPersona};
    if(deletedPersona.created) {
      setValues(p => ({
        ...p,
        personas: personas.filter(persona => {
          return persona.id !== deletedPersona.id;
        })
      }))
    }
    else {
      let remainingPersonas = [...personas];
      remainingPersonas.forEach(personas => {
        if(personas.id === deletedPersona.id) personas.deleted = true;
      })
      setValues(p => ({
        ...p,
        personas: remainingPersonas
      }))
    }
    setSelectedPersona(null);
  }
  

  const columnasEdit = useColumnsListPersona(handleOpenEditPersonaModal, handleOpenDeletePersonaModal, setSelectedPersona);
  const columnasDetalle = useColumnsListDetallePersona();

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
        columns={disabled ? columnasDetalle : columnasEdit}
        rows={personas.filter(persona => {
          return !persona.deleted;
        })}
      />
      <AddPersonaModal open={openModal.create} handleCloseModal={handleCloseModal} addPersona={addPersona} />
      <EditPersonaModal open={openModal.edit} handleCloseModal={handleCloseModal} persona={selectedPersona} setSelectedPersona={setSelectedPersona} editPersona={editPersona} />
      <DeletePersonaModal open={openModal.delete} handleCloseModal={handleCloseModal} deletePersona={deletePersona} />
    </CreateFasesContainer>
  );
}
 
export default PersonasAfectadas;
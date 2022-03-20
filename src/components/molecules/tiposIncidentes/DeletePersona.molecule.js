import { Modal } from "@mui/material";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { InfoOutlined } from "@mui/icons-material";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";
import EVButton from "../../atoms/EVButton.atom";

const DeletePersona = ({open, handleCloseModal, persona, setSelectedPersona, deletePersona}) => {

  const handleClose = () => {
    handleCloseModal("delete")
  }

  const handleEliminar = () => {
    deletePersona(persona);
    setSelectedPersona(null);
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <DeleteModalContainer>
          <InfoOutlined />
          {persona ? 
            <p>¿Estás seguro que deseas eliminar la persona <b><i>{persona.nombre_completo}</i></b>?</p>
            :
            ""
          }
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton label="Eliminar" variant="contained" onClick={handleEliminar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default DeletePersona;
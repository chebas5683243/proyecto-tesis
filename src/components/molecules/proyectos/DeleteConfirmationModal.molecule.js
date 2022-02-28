import { Modal } from "@mui/material";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { InfoOutlined } from "@mui/icons-material";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";
import EVButton from "../../atoms/EVButton.atom";

const DeleteConfirmationModal = ({open, handleCloseModal, fase, setSelectedFase, deleteFase}) => {

  const handleClose = () => {
    handleCloseModal("delete")
  }

  const handleEliminar = () => {
    deleteFase(fase);
    setSelectedFase(null);
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
          {fase ? 
            <p>¿Estás seguro que deseas eliminar la fase del proyecto <b><i>{fase.nombre}</i></b>?</p>
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
 
export default DeleteConfirmationModal;
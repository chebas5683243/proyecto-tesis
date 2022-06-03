import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { DeleteModalContainer } from "../../../../styles/containers/DeleteModal.style";
import { ModalContainer } from "../../../../styles/containers/Modal.style";
import EVButton from "../../../atoms/EVButton.atom";

const DeleteImpactoModal = ({open, handleCloseModal, deleteImpacto}) => {

  const handleClose = () => {
    handleCloseModal("delete");
  }

  const handleEliminar = () => {
    deleteImpacto();
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
          <p>¿Estás seguro que deseas eliminar la impacto inmediata?</p>
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton label="Eliminar" variant="contained" onClick={handleEliminar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default DeleteImpactoModal;
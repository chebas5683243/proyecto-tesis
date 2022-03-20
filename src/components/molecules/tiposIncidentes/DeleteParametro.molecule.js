import { Modal } from "@mui/material";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { InfoOutlined } from "@mui/icons-material";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";
import EVButton from "../../atoms/EVButton.atom";

const DeleteParametro = ({open, handleCloseModal, parametro, setSelectedParametro, deleteParametro}) => {

  const handleClose = () => {
    handleCloseModal("delete")
  }

  const handleEliminar = () => {
    deleteParametro(parametro);
    setSelectedParametro(null);
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
          {parametro ? 
            <p>¿Estás seguro que deseas eliminar el parametro <b><i>{parametro.parametro.label}</i></b>?</p>
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
 
export default DeleteParametro;
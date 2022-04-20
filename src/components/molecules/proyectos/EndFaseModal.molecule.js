import { Modal } from "@mui/material";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { InfoOutlined } from "@mui/icons-material";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";
import EVButton from "../../atoms/EVButton.atom";

const EndFaseModal = ({open, handleCloseModal, fase, setSelectedFase, endFase}) => {

  const handleClose = () => {
    handleCloseModal("end")
  }

  const handleTerminar = () => {
    endFase(fase);
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
            <p>¿Estás seguro que deseas dar por terminada la fase del proyecto <b><i>{fase.nombre}</i></b>?</p>
            :
            ""
          }
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton label="Terminar" variant="contained" onClick={handleTerminar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default EndFaseModal;
import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import EVButton from "../../../components/atoms/EVButton.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";

const DeactivateUsuario = ({open, handleCloseModal, fetchUsuarios, selectedId, setSelectedId}) => {

  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleClose = () => {
    handleCloseModal("deactivate");
    setSelectedId(null);
  }

  const handleEliminar = () => {
    setLoadingDelete(true);
    axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.USUARIOS}desactivar/${selectedId}`)
    .then((response) => {
      fetchUsuarios();
      handleClose();
      setLoadingDelete(false);
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <DeleteModalContainer>
          <InfoOutlined />
          <p className="modal-title">¿Estás seguro que deseas desactivar al usuario?</p>
          <p className="modal-text">Al desactivar al usuario, este ya no tendrá acceso al sistema, pero podrá volver a activarse.</p>
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingDelete} label="Desactivar" variant="contained" onClick={handleEliminar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default DeactivateUsuario;
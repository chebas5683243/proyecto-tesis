import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import EVButton from "../../../components/atoms/EVButton.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";

const ActivateUsuario = ({open, handleCloseModal, fetchUsuarios, selectedId, setSelectedId}) => {

  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleClose = () => {
    handleCloseModal("activate");
    setSelectedId(null);
  }

  const handleActivar = () => {
    setLoadingDelete(true);
    axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.USUARIOS}activar/${selectedId}`)
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
          <p className="modal-title">¿Estás seguro que deseas volver a activar al usuario?</p>
          <p className="modal-text">Al activar al usuario, este volverá a tener acceso al sistema y a los proyectos asignados.</p>
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingDelete} label="Activar" variant="contained" onClick={handleActivar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default ActivateUsuario;
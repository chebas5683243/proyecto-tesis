import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import EVButton from "../../../components/atoms/EVButton.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";

const ActivateEmpresa = ({open, handleCloseModal, fetchEmpresas, selectedId, setSelectedId}) => {

  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleClose = () => {
    handleCloseModal("activate");
    setSelectedId(null);
  }

  const handleActivar = () => {
    setLoadingDelete(true);
    axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.EMPRESAS}activar/${selectedId}`)
    .then((response) => {
      fetchEmpresas();
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
          <p className="modal-title">¿Estás seguro que deseas volver a activar la empresa?</p>
          <p className="modal-text">Al activar la empresa, los usuarios activos volverán a tener acceso al sistema.</p>
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingDelete} label="Activar" variant="contained" onClick={handleActivar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default ActivateEmpresa;
import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import EVButton from "../../../components/atoms/EVButton.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";

const ValidateInvestigacion = ({open, handleCloseModal, fetchInvestigaciones, selectedId, setSelectedId}) => {

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    handleCloseModal("validate");
    setSelectedId(null);
  }

  const handleActivar = () => {
    setLoading(true);
    axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}validarInvestigacion/${selectedId}`)
    .then((response) => {
      fetchInvestigaciones();
      handleClose();
      setLoading(false);
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
          <p className="modal-title">¿Estás seguro que deseas validar este reporte final?</p>
          <p className="modal-text">Al validar un reporte final, este ya no podrá ser editado y pasará a ser público en el repositorio de Incidentes Ambientales.</p>
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loading} label="Validar" variant="contained" onClick={handleActivar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default ValidateInvestigacion;
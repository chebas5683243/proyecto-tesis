import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import EVButton from "../../../../../components/atoms/EVButton.atom";
import { ModalContainer } from "../../../../../styles/containers/Modal.style";
import { DeleteModalContainer } from "../../../../../styles/containers/DeleteModal.style";
import axios from "axios";
import Config from "../../../../../constants/Config.constants";
import ApiRoutes from "../../../../../constants/ApiRoutes.constants";
import { useState } from "react";

const DeactivatePunto = ({open, handleCloseModal, fetchPuntos, selectedId, setSelectedId, action}) => {

  const [loadingDeactivate, setLoadingDeactivate] = useState(false);

  const handleClose = () => {
    if (action === "desactivar") handleCloseModal("deactivate");
    else handleCloseModal("activate");
    setSelectedId(null);
  }

  const handleEliminar = () => {
    setLoadingDeactivate(true);
    axios.put(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PUNTOS}${action}/${selectedId}`)
    .then((response) => {
      fetchPuntos();
      handleClose();
      setLoadingDeactivate(false);
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
          <p className="modal-title">¿Estás seguro que deseas {action} el punto de monitoreo del proyecto?</p>
          {action === "activar" ?
            <p className="modal-text">Al activar un punto, se podrá volver a registrar data en este.</p> :
            <p className="modal-text">Al desactivar un punto, ya no se podrá registrar data en este.</p>
          }
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingDeactivate} label={action[0].toUpperCase() + action.slice(1)} variant="contained" onClick={handleEliminar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default DeactivatePunto;
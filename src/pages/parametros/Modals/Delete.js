import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import EVButton from "../../../components/atoms/EVButton.atom";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import Config from "../../../constants/Config.constants";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { DeleteModalContainer } from "../../../styles/containers/DeleteModal.style";

const DeleteParametro = ({open, handleCloseModal, fetchParametros, selectedId, setSelectedId}) => {

  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleClose = () => {
    handleCloseModal("delete");
    setSelectedId(null);
  }

  const handleEliminar = () => {
    setLoadingDelete(true);
    axios.delete(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.PARAMETROS}${selectedId}`)
    .then((response) => {
      fetchParametros();
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
          <p className="modal-title">¿Estás seguro que deseas eliminar el parámetro del sistema?</p>
          <div className="buttons-container-centered">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingDelete} label="Eliminar" variant="contained" onClick={handleEliminar}/>
          </div>
        </DeleteModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default DeleteParametro;
import { Modal } from "@mui/material";
import { useContext, useState } from "react";
import { ModalContainer } from "../../../styles/containers/Modal.style";
import { RegistroModalContainer } from "../../../styles/containers/RegistroModal.style";
import EVButton from "../../atoms/EVButton.atom";
import ExcelIcon from "../../../assets/excel.png";
import axios from "axios";
import Config from "../../../constants/Config.constants";
import ApiRoutes from "../../../constants/ApiRoutes.constants";
import { ProjectContext } from "../../../context/ProjectContext";
import FileDownload from "js-file-download";
import { UserContext } from "../../../context/UserContext";

const ModalRegistro = ({ open, setOpenModal, fetchRegistros, handleOpenSnackbar, handleCloseSnackbar }) => {

  const { infoUsuario } = useContext(UserContext);

  const { puntoId } = useContext(ProjectContext);

  const [ archivo, setArchivo ] = useState(null);

  const [ loadingRegistro, setLoadingRegistro ] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleSubmitRegistro = () => {
    const archivoData = new FormData();
    archivoData.append("puntoId", puntoId);
    archivoData.append("recordFile", archivo);
    archivoData.append("registradorId", infoUsuario.id);

    setLoadingRegistro(true);
    handleOpenSnackbar('loadingUpload');
    axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.REGISTROS}importar`, archivoData)
    .then((response) => {
      handleCloseSnackbar('loadingUpload');
      handleOpenSnackbar('successUpload');
      fetchRegistros();
      setLoadingRegistro(false);
      handleClose();
    })
    .catch(() => {
      handleCloseSnackbar('loadingUpload');
      setLoadingRegistro(false);
      handleOpenSnackbar('errorUpload');
    })
  }

  const handleDownload = () => {
    handleOpenSnackbar('loadingDownload');
    axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.REGISTROS}punto/${puntoId}`, { responseType: 'blob' })
    .then((response) => {
      handleCloseSnackbar('loadingDownload');
      handleOpenSnackbar('successDownload');
      FileDownload(response.data, `plantilla-registro-pma-${puntoId}.xlsx`);
    })
  }

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <RegistroModalContainer>
          <div className="add-registro-container">
            <span className="modal-title">Agregar Registro de Monitoreo</span>
            <p className="modal-text">Para agregar un archivo que contengan el registro de un monitoreo realizado, deberá guiarse del siguiente formato:</p>
            <div className="formato-archivo" onClick={handleDownload}>
              <img className="excel-icon" src={ExcelIcon} alt="Icono Excel"/>
              <span className="excel-nombre">Formato de Registro de Monitoreo.xlsx</span>
            </div>
            <p className="modal-text">Una vez llenado el archivo con los valores de los parámetros, subir el archivo adjuntándolo aquí:</p>
            <div className="file-input">
              <input type="file" onChange={handleFileChange} accept=".xlsx"/>
            </div>
          </div>
          <div className="buttons-container">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton disabled={loadingRegistro} label="Agregar" variant="contained" onClick={handleSubmitRegistro}/>
          </div>
        </RegistroModalContainer>
      </ModalContainer>
    </Modal>
  );
}
 
export default ModalRegistro;
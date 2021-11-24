import { Modal } from '@mui/material';
import { useState, useContext } from "react";
import { ModalContainer } from "../../styles/containers/Modal.style";
import { UserContext } from "../../context/UserContext";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import Config from "../../constants/Config.constants";
import axios from "axios";
import CustomTextField from "../../components/atoms/CustomTextField.atom";
import EVButton from "../../components/atoms/EVButton.atom";

const CambiarContrasena = ({ open, setOpen}) => {

  const { infoUsuario } = useContext(UserContext);

  const [ datos, setDatos ] = useState({
    current: '',
    newPassword: '',
    repeatPassword: ''
  })

  const handleOnChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.USUARIOS}cambiarPassword`, {'id': infoUsuario.id, 'password': datos.newPassword})
    .then(() => {
      setOpen(false);
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className="title">
          <span>Cambiar Contraseña</span>
        </div>
        <div className="fields-container">
          <CustomTextField
            label="CONTRASEÑA ACTUAL"
            size={4}
            name="current"
            value={datos.current}
            onChange={handleOnChange} />
          <CustomTextField
            label="NUEVA CONTRASEÑA"
            size={4}
            name="newPassword"
            value={datos.newPassword}
            onChange={handleOnChange} />
          <CustomTextField
            label="REPETIR CONTRASEÑA"
            size={4}
            name="repeatPassword"
            value={datos.repeatPassword}
            onChange={handleOnChange} />
        </div>
        <div className="buttons-container">
          <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
          <EVButton label="Guardar" variant="contained" onClick={handleSave} />
        </div>
      </ModalContainer>
    </Modal>
  );
}
 
export default CambiarContrasena;
import { Modal } from '@mui/material';
import { useContext } from "react";
import { ModalContainer } from "../../styles/containers/Modal.style";
import { UserContext } from "../../context/UserContext";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import Config from "../../constants/Config.constants";
import axios from "axios";
import EVTextField from "../../components/atoms/EVTextField.atom";
import EVButton from "../../components/atoms/EVButton.atom";
import useForm from '../../hooks/useForm.hook';
import { validateChangePassword } from '../../utils/formValidations';

const CambiarContrasena = ({ open, setOpen, setOpenSnackbar}) => {

  const { infoUsuario, token } = useContext(UserContext);

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    current: '',
    newPassword: '',
    repeatPassword: ''
  });

  const handleClose = () => {
    setOpen(false);
    setValues({
      current: '',
      newPassword: '',
      repeatPassword: ''
    })
    setErrors({})
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setErrors(f => ({}));
    let validation = await validateChangePassword(values, infoUsuario, token);
    setErrors(f => validation.errors);
    if(validation.isValid){
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.USUARIOS}cambiarPassword`, {'id': infoUsuario.id, 'password': values.newPassword})
      .then(() => {
        handleClose();
        setOpenSnackbar(true);
      })
    }
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
        <form className="fields-container" onSubmit={handleSave}>
          <EVTextField
            type="password"
            label="CONTRASEÑA ACTUAL"
            size={4}
            name="current"
            value={values.current}
            error={errors.current ? true : false}
            helperText={errors.current}
            onChange={handleInputChange} />

          <EVTextField
            type="password"
            label="NUEVA CONTRASEÑA"
            size={4}
            name="newPassword"
            value={values.newPassword}
            error={errors.newPassword ? true : false}
            helperText={errors.newPassword}
            onChange={handleInputChange} />

          <EVTextField
            type="password"
            label="REPETIR CONTRASEÑA"
            size={4}
            name="repeatPassword"
            value={values.repeatPassword}
            error={errors.repeatPassword ? true : false}
            helperText={errors.repeatPassword}
            onChange={handleInputChange} />

          <div className="buttons-container">
            <EVButton label="Cancelar" variant="outlined" onClick={handleClose} />
            <EVButton type="submit" label="Guardar" variant="contained"/>
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
}
 
export default CambiarContrasena;
import { useContext, useState } from "react";
import EVButton from "../../components/atoms/EVButton.atom";
import LogoImg from "../../assets/logo.png";
import axios from "axios";
import ApiRoutes from '../../constants/ApiRoutes.constants';
import Config from '../../constants/Config.constants';
import { UserContext } from "../../context/UserContext";
import { LoginContainer } from "../../styles/Login.style";
import { InputAdornment, Alert } from '@mui/material';
import { Visibility, Email } from '@mui/icons-material';
import { StyledCustomLoginField } from "../../styles/TextField.style";
import useForm from "../../hooks/useForm.hook";
import { validateLogin } from "../../utils/formValidations";

const Login = () => {

  const { setInfoUsuario, setToken } = useContext(UserContext);

  const [ errorLogin, setErrorLogin ] = useState(false);

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    email: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    let validation = validateLogin(values);
    setErrors(validation.errors);
    setErrorLogin(f => false);
    if(validation.isValid){
      axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.AUTH}login`, values)
      .then((result) => {
        if(result.data.access_token){
          setInfoUsuario(result.data.usuario);
          setToken(result.data.access_token);
          localStorage.setItem('token', result.data.access_token);
        }
        else{
          setErrorLogin(f => true);
          setValues({...values,
            password: ''
          })
        }
      })
    }
  }

  return (
    <LoginContainer>
      <div className="glass-container">
        <div className="title-container">
          <img src={LogoImg} alt="logo" />
          <div className="title">
            <span className="eco">Eco</span>
            <span className="viewer">Viewer</span>
          </div>
        </div>
        <div className="subtitulo">
          <p>Aliados para la conservación de la naturaleza</p>
        </div>
        {errorLogin && <Alert variant="filled" severity="error">Email o contraseña incorrecta</Alert>}
        <form className="formulario" onSubmit={handleLogin} autoComplete="off">
          <StyledCustomLoginField
            type="text"
            name="email"
            label="Email"
            variant="standard"
            color="secondary"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email ? true : false}
            helperText={errors.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Email style={{fontSize: 24, color: '#0030A8'}}/>
                </InputAdornment>
              ),
            }} />
          <StyledCustomLoginField
            type="password"
            name="password"
            label="Contraseña"
            variant="standard"
            color="secondary"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password ? true : false}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Visibility style={{fontSize: 24, color: '#0030A8'}}/>
                </InputAdornment>
              ),
            }} />
          <EVButton type="submit" label="Ingresar" variant="contained"/>
        </form>
        <div className="footer">
          <span>¿Has olvidado tu contraseña?</span>
        </div>
      </div>
    </LoginContainer>
  );
}
 
export default Login;
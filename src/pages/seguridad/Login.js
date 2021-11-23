import { useState, useContext } from "react";
import EVButton from "../../components/atoms/EVButton.atom";
import LogoImg from "../../assets/logo.png";
import axios from "axios";
import ApiRoutes from '../../constants/ApiRoutes.constants';
import Config from '../../constants/Config.constants';
import { UserContext } from "../../context/UserContext";
import { LoginContainer } from "../../styles/Login.style";
import { InputAdornment } from '@mui/material';
import { Visibility, Email } from '@mui/icons-material';
import { StyledCustomLoginField } from "../../styles/TextField.style";

const Login = () => {

  const { setInfoUsuario, setToken } = useContext(UserContext);

  const [ datos, setDatos ] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.AUTH}login`, datos)
      .then((result) => {
        if(result.data.access_token){
          setInfoUsuario(result.data.usuario);
          setToken(result.data.access_token);
          localStorage.setItem('token', result.data.access_token);
          // history.push("/home");
        }
        else{
          // setError(4);
        }
      })
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
        <form className="formulario" onSubmit={handleLogin}>
          <StyledCustomLoginField
            type="text"
            autoComplete="off"
            name="email"
            label="Email"
            variant="standard"
            color="secondary"
            value={datos.email}
            onChange={handleOnChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Email style={{fontSize: 24, color: '#0030A8'}}/>
                </InputAdornment>
              ),
            }} />
          <StyledCustomLoginField
            type="password"
            autoComplete="off"
            name="password"
            label="Contraseña"
            variant="standard"
            color="secondary"
            value={datos.password}
            onChange={handleOnChange}
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
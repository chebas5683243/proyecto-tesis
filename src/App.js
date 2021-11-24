import { ThemeProvider as ThemeMaterial} from '@mui/material/styles';
import { ThemeProvider as ThemeStyled} from 'styled-components';
import { getToken } from './utils/authHelper';
import React from 'react';
import Router from './routers/Router';
import theme from './styles/theme';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import ApiRoutes from './constants/ApiRoutes.constants';
import Config from './constants/Config.constants';

function App() {

  const [loadingUser, setLoadingUser] = useState(true);
  const { setInfoUsuario, setToken } = useContext(UserContext);

  useEffect(() => {
    async function loadUser(){
      let token = getToken();
      if(!token){
        setLoadingUser(false);
        return;
      }

      try{
        const { data } = await axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.AUTH}me`,null,{
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setToken(token);
        setInfoUsuario(data);
        setLoadingUser(false);
      } catch(error) {
        console.log(error);
      }
    }

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeMaterial theme = {theme}>
      <ThemeStyled theme = {theme}>
        {!loadingUser ?
          <Router />
          : null}
      </ThemeStyled>
    </ThemeMaterial>
    
  );
}

export default App;

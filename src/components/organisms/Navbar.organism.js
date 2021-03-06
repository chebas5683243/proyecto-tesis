import { LogoContainer, NavbarContainer } from "../../styles/containers/Navbar.style";
import Hamburger from "../atoms/Hambuger.atom";
import Logo from "../atoms/Logo.atom";
import CambiarContrasena from "../../pages/seguridad/CambiarContrasena";
import { useState, useContext } from "react";
import { Alert, Button, Menu, MenuItem, Snackbar } from '@mui/material';
import axios from "axios";
import Config from "../../constants/Config.constants";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import { UserContext } from "../../context/UserContext";

const NavBar = () => {

  const { infoUsuario, setInfoUsuario, token, setToken } = useContext(UserContext);

  const [ openModal, setOpenModal ] = useState(false);
  
  const [ openSnackbar, setOpenSnackbar ] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCerrarSesion = () => {
    axios.post(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.AUTH}logout`, null, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((result) => {
        setToken(null);
        setInfoUsuario(null);
        localStorage.removeItem('token');
      })
  }

  const handleOpenModal = () => {
    setOpenModal(true);
    handleCloseMenu();
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const getName = (info) => {
    return `${info.primer_nombre} ${info.segundo_nombre} ${info.primer_apellido} ${info.segundo_apellido}`
  }

  return (
    <NavbarContainer>
      <LogoContainer>
        <Hamburger color='#0030A8'/>
        <Logo />
      </LogoContainer>
      
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
      >
        {getName(infoUsuario)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        disableRestoreFocus={true}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleOpenModal}>Cambiar Contrase??a</MenuItem>
        <MenuItem onClick={handleCerrarSesion}>Cerrar sesi??n</MenuItem>
      </Menu>
      <CambiarContrasena open={openModal} setOpen={setOpenModal} setOpenSnackbar={setOpenSnackbar}/>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseSnackbar}>Su contrase??a ha sido cambiada exitosamente.</Alert>
      </Snackbar>
    </NavbarContainer>
  );
}
 
export default NavBar;
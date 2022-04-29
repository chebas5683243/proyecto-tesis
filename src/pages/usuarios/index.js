import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListUsuarios } from "../../constants/UsuariosColumns.constants";
import { useFetchUsuarios } from "../../services/Usuarios.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";
import ActivateUsuario from "./Modals/Activate";
import DeactivateUsuario from "./Modals/Deactivate";

const Usuarios = () => {

  const history = useHistory();

  const {loadingUsuarios, usuarios, fetchUsuarios } = useFetchUsuarios();

  const [openModal, setOpenModal] = useState({
    activate: false,
    deactivate: false
  });

  const [selectedId, setSelectedId] = useState(null);

  const handleCreate = () => {
    history.push("/usuarios/create");
  }

  const handleCloseModal = (modal) => {
    setOpenModal(s => ({
      ...s,
      [modal]: false
    }));
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Usuarios</PrimaryTitle>
          <SecondaryTitle>{usuarios.length} usuarios registrados</SecondaryTitle>
        </div>
        <EVButton
          label="Nuevo Usuario"
          variant="contained"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleCreate}
        /> 
      </HeaderContainer>
      <MiddleContainer>
        <StyledSearchTextField
          variant="outlined"
          placeholder="Búsqueda rápida por razón social"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{fontSize: 18, color: '#828282'}}/>
              </InputAdornment>
            )}} 
          />
      </MiddleContainer>
      <EVDataGrid
        loading={loadingUsuarios}
        columns={useColumnsListUsuarios(setOpenModal, setSelectedId)}
        rows={usuarios}
      />
      <DeactivateUsuario open={openModal.deactivate} handleCloseModal={handleCloseModal} fetchUsuarios={fetchUsuarios} selectedId={selectedId} setSelectedId={setSelectedId}/>
      <ActivateUsuario open={openModal.activate} handleCloseModal={handleCloseModal} fetchUsuarios={fetchUsuarios} selectedId={selectedId} setSelectedId={setSelectedId}/>
    </ListViewContainer>
  );
}
 
export default Usuarios;
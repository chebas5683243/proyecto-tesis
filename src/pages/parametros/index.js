import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListParametros } from "../../constants/ParametrosColumns.constants";
import { useFetchParametros } from "../../services/Parametros.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";
import CreateParametros from "./Modals/Create";
import DeleteParametro from "./Modals/Delete";
import EditParametros from "./Modals/Edit";

const Parametros = () => {

  const {loadingParametros, parametros, fetchParametros } = useFetchParametros();

  const [ openModal, setOpenModal ] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const [ selectedId, setSelectedId ] = useState(null);

  const handleCreate = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }))
  }

  const handleCloseModal = (modal) => {
    setOpenModal(p => ({
      ...p,
      [modal]: false
    }));
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Parámetros</PrimaryTitle>
          <SecondaryTitle>{parametros.length} parámetros registrados</SecondaryTitle>
        </div>
        <EVButton
          label="Nuevo Parámetro"
          variant="contained"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleCreate}
        />  
      </HeaderContainer>
      <MiddleContainer>
        <StyledSearchTextField
          variant="outlined"
          placeholder="Búsqueda rápida por nombre o nombre corto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{fontSize: 18, color: '#828282'}}/>
              </InputAdornment>
            )}} 
          />
      </MiddleContainer>
      <EVDataGrid
        loading={loadingParametros}
        columns={useColumnsListParametros(setOpenModal, setSelectedId)}
        rows={parametros}
      />
      <CreateParametros open={openModal.create} handleCloseModal={handleCloseModal} fetchParametros={fetchParametros}/>
      <EditParametros open={openModal.edit} handleCloseModal={handleCloseModal} fetchParametros={fetchParametros} selectedId={selectedId} setSelectedId={setSelectedId}/>
      <DeleteParametro open={openModal.delete} handleCloseModal={handleCloseModal} fetchParametros={fetchParametros} selectedId={selectedId} setSelectedId={setSelectedId}/>
    </ListViewContainer>
  );
}
 
export default Parametros;
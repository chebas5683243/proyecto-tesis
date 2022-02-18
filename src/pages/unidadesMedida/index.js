import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListUnidades } from "../../constants/UnidadesColumns.constants";
import { useFetchUnidades } from "../../services/UnidadesMedida.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";
import CreateUnidadMedida from "./Modals/Create";
import EditUnidadMedida from "./Modals/Edit";

const UnidadesMedida = () => {

  const {loadingUnidades, unidades, fetchUnidades } = useFetchUnidades();

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
          <PrimaryTitle>Unidades de medida</PrimaryTitle>
          <SecondaryTitle>{unidades.length} unidades registradas</SecondaryTitle>
        </div>
        <EVButton
          label="Nueva Unnidad"
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
        loading={loadingUnidades}
        columns={useColumnsListUnidades(fetchUnidades, setOpenModal, setSelectedId)}
        rows={unidades}
      />
      <CreateUnidadMedida open={openModal.create} handleCloseModal={handleCloseModal} fetchUnidades={fetchUnidades}/>
      <EditUnidadMedida open={openModal.edit} handleCloseModal={handleCloseModal} fetchUnidades={fetchUnidades} selectedId={selectedId} setSelectedId={setSelectedId}/>
    </ListViewContainer>
  );
}
 
export default UnidadesMedida;
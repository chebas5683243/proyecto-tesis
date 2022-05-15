import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListIncidentes } from "../../constants/IncidentesColumns.constants";
import { useFetchIncidentes } from "../../services/Incidentes.services";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";

const Incidentes = () => {

  const history = useHistory();

  const { loadingIncidentes, incidentes, fetchIncidentes } = useFetchIncidentes();

  const [openModal, setOpenModal] = useState({
    activate: false,
    deactivate: false
  });

  const [selectedId, setSelectedId] = useState(null);

  const handleCreate = () => {
    history.push("/incidentes/create");
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
          <PrimaryTitle>Reportes Preliminares</PrimaryTitle>
          <SecondaryTitle>{incidentes.length} reportes</SecondaryTitle>
        </div>
        <EVButton
          label="Nuevo Reporte"
          variant="contained"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleCreate}
        />  
      </HeaderContainer>
      <MiddleContainer>
        <StyledSearchTextField
          variant="outlined"
          placeholder="Búsqueda rápida por código"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{fontSize: 18, color: '#828282'}}/>
              </InputAdornment>
            )}} 
          />
      </MiddleContainer>
      <EVDataGrid
        loading={loadingIncidentes}
        columns={useColumnsListIncidentes(setOpenModal, setSelectedId)}
        rows={incidentes}
      />
    </ListViewContainer>
  );
}
 
export default Incidentes;
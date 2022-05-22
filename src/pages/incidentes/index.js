import { Add, Search, Settings } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListIncidentes } from "../../constants/IncidentesColumns.constants";
import { useFetchIncidentes } from "../../services/Incidentes.services";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledTab, StyledTabs } from "../../styles/Tabs.style";
import { StyledSearchTextField } from "../../styles/TextField.style";

const Incidentes = () => {

  const history = useHistory();

  const { loadingIncidentes, incidentes } = useFetchIncidentes();

  const [ tab, setTab ] = useState(0);

  const handleCreate = () => {
    history.push("/incidentes/create");
  }

  const handleChange = (event, newValue) => {
    setTab(newValue);
    history.push("/investigaciones");
  }

  return (
    <ListViewContainer>
      <Box style={{marginBottom: '1.5rem'}}>
        <StyledTabs value={tab} onChange={handleChange}>
          <StyledTab label="Reportes Preliminares" />
          <StyledTab label="Reportes Finales" />
        </StyledTabs>
      </Box>
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
        columns={useColumnsListIncidentes()}
        rows={incidentes}
        components={{
          MoreActionsIcon: Settings
        }}
      />
    </ListViewContainer>
  );
}
 
export default Incidentes;
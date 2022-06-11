import { Add, Search, Settings } from "@mui/icons-material";
import { Alert, Box, InputAdornment, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import Config from "../../constants/Config.constants";
import { useColumnsListIncidentes } from "../../constants/IncidentesColumns.constants";
import { useFetchIncidentes } from "../../services/Incidentes.services";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledTab, StyledTabs } from "../../styles/Tabs.style";
import { StyledSearchTextField } from "../../styles/TextField.style";
import FileDownload from "js-file-download";

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
  
  const [ openSnackbars, setOpenSnackbars ] = useState({
    loadingDownload: false,
    successDownload: false
  });

  const handleCloseSnackbar = (snackbar) => {
    setOpenSnackbars(s => ({
      ...s,
      [snackbar]: false,
    }))
  }

  const handleOpenSnackbar = (snackbar) => {
    setOpenSnackbars(s => ({
      ...s,
      [snackbar]: true,
    }))
  }

  const handleExport = (incidenteID, incidenteCodigo) => {
    handleOpenSnackbar('loadingDownload');
    axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INCIDENTES}exportarIncidente/${incidenteID}`, { responseType: 'blob' })
    .then((response) => {
      handleCloseSnackbar('loadingDownload');
      handleOpenSnackbar('successDownload');
      FileDownload(response.data, `incidente-${incidenteCodigo}.pdf`);
    })
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
        columns={useColumnsListIncidentes(handleExport)}
        rows={incidentes}
        components={{
          MoreActionsIcon: Settings
        }}
      />
      <Snackbar open={openSnackbars.loadingDownload}>
        <Alert variant="filled" severity="info" sx={{ width: '100%' }}>
          Descargando reporte ...
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackbars.successDownload} autoHideDuration={6000} onClose={() => handleCloseSnackbar('successDownload')}>
        <Alert onClose={() => handleCloseSnackbar('successDownload')} variant="filled" severity="success" sx={{ width: '100%' }}>
          Reporte descargado
        </Alert>
      </Snackbar>
    </ListViewContainer>
  );
}
 
export default Incidentes;
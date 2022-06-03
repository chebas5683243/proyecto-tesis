import { Add, Search, Settings } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import Config from "../../constants/Config.constants";
import { useColumnsListInvestigaciones } from "../../constants/InvestigacionesColumns.constants";
import { useFetchInvestigaciones } from "../../services/Investigaciones.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledTab, StyledTabs } from "../../styles/Tabs.style";
import { StyledSearchTextField } from "../../styles/TextField.style";
import ValidateInvestigacion from "./Modals/Validate";
import FileDownload from "js-file-download";

const Investigaciones = () => {

  const history = useHistory();

  const { loadingInvestigaciones, investigaciones, fetchInvestigaciones } = useFetchInvestigaciones();

  const [openModal, setOpenModal] = useState({
    validate: false,
  });

  const [selectedId, setSelectedId] = useState(null);

  const [ tab, setTab ] = useState(1);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    history.push("/incidentes");
  }

  const handleCloseModal = (modal) => {
    setOpenModal(s => ({
      ...s,
      [modal]: false
    }));
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

  const handleExport = (investigacionID) => {
    handleOpenSnackbar('loadingDownload');
    axios.get(`${Config.API_URL}${Config.API_PATH}${ApiRoutes.INVESTIGACIONES}exportarInvestigacion/${investigacionID}`, { responseType: 'blob' })
    .then((response) => {
      handleCloseSnackbar('loadingDownload');
      handleOpenSnackbar('successDownload');
      FileDownload(response.data, `investigacion-${investigacionID}.pdf`);
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
          <PrimaryTitle>Reportes Finales</PrimaryTitle>
          <SecondaryTitle>{investigaciones.length} reportes</SecondaryTitle>
        </div>
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
        loading={loadingInvestigaciones}
        columns={useColumnsListInvestigaciones(setOpenModal, setSelectedId, handleExport)}
        rows={investigaciones}
        components={{
          MoreActionsIcon: Settings
        }}
      />
      <ValidateInvestigacion open={openModal.validate} handleCloseModal={handleCloseModal} fetchInvestigaciones={fetchInvestigaciones} selectedId={selectedId} setSelectedId={setSelectedId}/>
    </ListViewContainer>
  );
}
 
export default Investigaciones;
import { FilterList, Search, Settings } from "@mui/icons-material";
import { Alert, InputAdornment, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import ApiRoutes from "../../constants/ApiRoutes.constants";
import Config from "../../constants/Config.constants";
import { useColumnsListInvestigaciones } from "../../constants/InvestigacionesColumns.constants";
import { useFetchInvestigaciones, useFetchInvestigacionesConFiltro } from "../../services/Investigaciones.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";
import FileDownload from "js-file-download";
import EVButton from "../../components/atoms/EVButton.atom";
import Filtros from "../../components/organisms/Filtros.organism";

const Repositorio = () => {

  const { loadingInvestigaciones, investigaciones, fetchInvestigacionesConFiltro } = useFetchInvestigacionesConFiltro();

  const [openFilter, setOpenFilter] = useState(false);

  const [openSnackbars, setOpenSnackbars] = useState({
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
      <HeaderContainer>
        <div>
          <PrimaryTitle>Repositorio de incidentes</PrimaryTitle>
          <SecondaryTitle>{investigaciones.length} reportes</SecondaryTitle>
        </div>
        <EVButton
          label="Filtrar"
          variant="contained"
          startIcon={<FilterList style={{ fontSize: 24 }}/>}
          onClick={() => setOpenFilter(true)}
        />  
      </HeaderContainer>
      <MiddleContainer>
        <StyledSearchTextField
          variant="outlined"
          placeholder="Búsqueda rápida por código"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ fontSize: 18, color: '#828282' }} />
              </InputAdornment>
            )
          }}
        />
      </MiddleContainer>
      <EVDataGrid
        loading={loadingInvestigaciones}
        columns={useColumnsListInvestigaciones(() => { }, () => { }, handleExport)}
        rows={investigaciones}
        components={{
          MoreActionsIcon: Settings
        }}
      />
      <Filtros
        show={openFilter}
        setShow={setOpenFilter}
        fetchInvestigacion={fetchInvestigacionesConFiltro}
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

export default Repositorio;
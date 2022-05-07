import { Add, BarChart, Search, StackedLineChart } from "@mui/icons-material";
import { Alert, InputAdornment, Portal, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import EVButton from "../../../../../components/atoms/EVButton.atom";
import EVDataGrid from "../../../../../components/atoms/EVDataGrid.atom";
import EVIconButton from "../../../../../components/atoms/EVIconButton.atom";
import MapView from "../../../../../components/organisms/MapView.organism";
import ParametersPunto from "../../../../../components/organisms/monitoreo/Parametros.organism";
import { ProjectContext } from "../../../../../context/ProjectContext";
import { useFetchDetallePuntoConRegistros } from "../../../../../services/Puntos.service";
import { ButtonsContainer, HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle } from "../../../../../styles/containers/View.style";
import { PuntosMonitoreoContainer } from "../../../../../styles/monitoreo/PuntosMonitore.style";
import { StyledSearchTextField } from "../../../../../styles/TextField.style";
import { useFetchRegistros } from "../../../../../services/Registros.service";
import { useColumnsListRegistros } from "../../../../../constants/RegistrosColumns.constants";
import ModalRegistro from "../../../../../components/organisms/monitoreo/ModalRegistro.organism";

const PuntoMonitoreo = () => {

  const { puntoId, setOpenParametros } = useContext(ProjectContext);

  const { loadingPunto, punto } = useFetchDetallePuntoConRegistros(puntoId);

  const [ openModal, setOpenModal ] = useState(false);

  const { loadingRegistros, registros, fetchRegistros } = useFetchRegistros(puntoId);

  const [ openSnackbars, setOpenSnackbars ] = useState({
    loadingDownload: false,
    successDownload: false,
    loadingUpload: false,
    errorUpload: false,
    successUpload: false
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

  return (
    <PuntosMonitoreoContainer>
      <div className="points-map-container">
        <MapView puntos={[punto]}/>
        <div className="info-punto-container">
          <div className="titulo-info">
            <span className="nombre-punto">{punto?.nombre}</span>
            <span className="codigo-punto">{punto?.codigo}</span>
          </div>
          <div className="coordenadas-container">
            <div className="coordenadas">
              <div className="nombre-coordenada">
                <span>Longitud:</span>
                <span>Latitud:</span>
                <span>Altitud:</span>
              </div>
              <div className="data-coordenada">
                <span>{punto?.longitud}</span>
                <span>{punto?.latitud}</span>
                <span>{punto?.altitud}</span>
              </div>
            </div>
            <div className="ultimo-registro">
              <p>Último registro hace 13 horas</p>
            </div>
          </div>
        </div>
      </div>
      <ListViewContainer className="points-list">
        <HeaderContainer>
          <div>
            <PrimaryTitle>{loadingPunto ? "" : punto.nombre}</PrimaryTitle>
          </div>
          <ButtonsContainer>
            <EVIconButton
              variant="outlined"
              startIcon={<BarChart style={{ fontSize: 24 }}/>}
              onClick={() => setOpenParametros(true)}
            />
            <EVIconButton
              variant="outlined"
              startIcon={<StackedLineChart style={{ fontSize: 24 }}/>}
            />
            {punto?.estado ?
              <EVButton
                variant="contained"
                label="Nuevo Registro"
                startIcon={<Add style={{ fontSize: 24 }}/>}
                onClick={() => setOpenModal(true)}
              />
              : null
            }
          </ButtonsContainer>
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
          loading={loadingRegistros}
          columns={useColumnsListRegistros()}
          rows={registros}
        />
        <ParametersPunto />
      </ListViewContainer>
      <ModalRegistro open={openModal} setOpenModal={setOpenModal} fetchRegistros={fetchRegistros} handleOpenSnackbar={handleOpenSnackbar} handleCloseSnackbar={handleCloseSnackbar}/>
      <Portal>
        <Snackbar open={openSnackbars.loadingDownload}>
          <Alert variant="filled" severity="info" sx={{ width: '100%' }}>
            Descargando plantilla ...
          </Alert>
        </Snackbar>
        <Snackbar open={openSnackbars.successDownload} autoHideDuration={6000} onClose={() => handleCloseSnackbar('successDownload')}>
          <Alert onClose={() => handleCloseSnackbar('successDownload')} variant="filled" severity="success" sx={{ width: '100%' }}>
            Plantilla descargada
          </Alert>
        </Snackbar>
        <Snackbar open={openSnackbars.loadingUpload}>
          <Alert variant="filled" severity="info" sx={{ width: '100%' }}>
            Subiendo archivo ...
          </Alert>
        </Snackbar>
        <Snackbar open={openSnackbars.errorUpload} onClose={() => handleCloseSnackbar('errorUpload')}>
          <Alert onClose={() => handleCloseSnackbar('errorUpload')} variant="filled" severity="error" sx={{ width: '100%' }}>
            Error
          </Alert>
        </Snackbar>
        <Snackbar open={openSnackbars.successUpload} autoHideDuration={6000} onClose={() => handleCloseSnackbar('successUpload')}>
          <Alert onClose={() => handleCloseSnackbar('successUpload')} variant="filled" severity="success" sx={{ width: '100%' }}>
            Registro exitoso
          </Alert>
        </Snackbar>
      </Portal>
    </PuntosMonitoreoContainer>
  );
}
 
export default PuntoMonitoreo;
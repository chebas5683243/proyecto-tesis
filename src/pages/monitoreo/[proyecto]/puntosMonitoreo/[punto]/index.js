import { Add, BarChart, Search, StackedLineChart } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useContext } from "react";
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

const PuntoMonitoreo = () => {

  const { puntoId, setOpenParametros } = useContext(ProjectContext);

  const { loadingPunto, punto } = useFetchDetallePuntoConRegistros(puntoId);

  const { loadingRegistros, registros } = useFetchRegistros(puntoId);

  return (
    <PuntosMonitoreoContainer>
      <div className="points-map-container">
        <MapView puntos={[punto]}/>
      </div>
      <ListViewContainer className="points-list">
        <HeaderContainer>
          <div>
            <PrimaryTitle>{loadingPunto ? "" : punto.nombre}</PrimaryTitle>
            {/* <SecondaryTitle>{puntos.length} puntos de monitoreo</SecondaryTitle> */}
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
              // onClick={handleCreate}
            />
            {punto?.estado ?
              <EVButton
                variant="contained"
                label="Nuevo Registro"
                startIcon={<Add style={{ fontSize: 24 }}/>}
                // onClick={handleCreate}
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
          // rowHeight={75}
          loading={loadingRegistros}
          columns={useColumnsListRegistros()}
          rows={registros}
        />
        <ParametersPunto />
      </ListViewContainer>
    </PuntosMonitoreoContainer>
  );
}
 
export default PuntoMonitoreo;
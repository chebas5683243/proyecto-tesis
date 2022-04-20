import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useHistory } from "react-router";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListTiposIncidentes } from "../../constants/TiposIncidentesColumns.constants";
import { useFetchTiposIncidentes } from "../../services/TipoIncidente.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";

const TipoIncidente = () => {

  const history = useHistory();

  const {loadingTiposIncidentes, tiposIncidentes, fetchTiposIncidentes } = useFetchTiposIncidentes();

  const handleCreate = () => {
    history.push("/tipoIncidentes/create");
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Tipos de Incidente</PrimaryTitle>
          <SecondaryTitle>{tiposIncidentes.length} tipos de incidente registrados</SecondaryTitle>
        </div>
        <EVButton
          label="Nuevo tipo de incidente"
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
        loading={loadingTiposIncidentes}
        columns={useColumnsListTiposIncidentes(fetchTiposIncidentes)}
        rows={tiposIncidentes}
      />
    </ListViewContainer>
  );
}
 
export default TipoIncidente;
import { Search, UploadOutlined } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import EVButton from "../../components/atoms/EVButton.atom";
import GridProyecto from "../../components/organisms/monitoreo/GridProyectos.organism";
import { useFetchProyectos } from "../../services/Proyectos.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";

const Monitoreo = () => {

  const {loadingProyectos, proyectos } = useFetchProyectos();

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Monitoreo Ambiental</PrimaryTitle>
          <SecondaryTitle>{proyectos.length} proyectos en ejecución</SecondaryTitle>
        </div>
        <EVButton
          label="Registrar data"
          variant="contained"
          startIcon={<UploadOutlined style={{ fontSize: 24 }}/>}
        />
      </HeaderContainer>
      <MiddleContainer>
        <StyledSearchTextField
          variant="outlined"
          placeholder="Búsqueda rápida por código de proyecto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{fontSize: 18, color: '#828282'}}/>
              </InputAdornment>
            )}} 
          />
      </MiddleContainer>
      <GridProyecto
        loading={loadingProyectos}
        proyectos={proyectos}
      />
    </ListViewContainer>
  );
}
 
export default Monitoreo;
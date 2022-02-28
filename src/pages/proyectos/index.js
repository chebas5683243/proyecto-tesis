import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useHistory } from "react-router";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListProyectos } from "../../constants/ProyectosColumns.constants";
import { useFetchProyectos } from "../../services/Proyectos.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";

const Proyectos = () => {

  const history = useHistory();

  const {loadingProyectos, proyectos, fetchProyectos} = useFetchProyectos();

  const handleCreate = () => {
    history.push("/proyectos/create");
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Proyectos</PrimaryTitle>
          <SecondaryTitle>{proyectos.length} proyectos registrados</SecondaryTitle>
        </div>
        <EVButton
          label="Nuevo Proyecto"
          variant="contained"
          startIcon={<Add style={{ fontSize: 24 }}/>}
          onClick={handleCreate}
        />  
      </HeaderContainer>
      <MiddleContainer>
        <StyledSearchTextField
          variant="outlined"
          placeholder="Búsqueda rápida por código o nombre"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{fontSize: 18, color: '#828282'}}/>
              </InputAdornment>
            )}} 
          />
      </MiddleContainer>
      <EVDataGrid
        loading={loadingProyectos}
        columns={useColumnsListProyectos(fetchProyectos)}
        rows={proyectos}
      />
    </ListViewContainer>
  );
}
 
export default Proyectos;
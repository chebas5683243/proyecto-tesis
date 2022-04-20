import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useHistory } from "react-router";
import EVButton from "../../components/atoms/EVButton.atom";
import EVDataGrid from "../../components/atoms/EVDataGrid.atom";
import { useColumnsListEmpresas } from "../../constants/EmpresasColumns.constants";
import { useFetchEmpresas } from "../../services/Empresas.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../styles/containers/View.style";
import { StyledSearchTextField } from "../../styles/TextField.style";

const Empresas = () => {

  const history = useHistory();

  const {loadingEmpresas, empresas, fetchEmpresas } = useFetchEmpresas();

  const handleCreate = () => {
    history.push("/empresas/create");
  }

  return (
    <ListViewContainer>
      <HeaderContainer>
        <div>
          <PrimaryTitle>Empresas</PrimaryTitle>
          <SecondaryTitle>{empresas.length} empresas registradas</SecondaryTitle>
        </div>
        <EVButton
          label="Nueva Empresa"
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
        loading={loadingEmpresas}
        columns={useColumnsListEmpresas(fetchEmpresas)}
        rows={empresas}
      />
    </ListViewContainer>
  );
}
 
export default Empresas;
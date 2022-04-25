import { Add, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import EVButton from "../../../../components/atoms/EVButton.atom";
import EVDataGrid from "../../../../components/atoms/EVDataGrid.atom";
import MapView from "../../../../components/organisms/MapView.organism";
import { useColumnsListPuntos } from "../../../../constants/PuntosColumns.constants";
import { useFetchPuntos } from "../../../../services/Puntos.service";
import { HeaderContainer, ListViewContainer, MiddleContainer, PrimaryTitle, SecondaryTitle } from "../../../../styles/containers/View.style";
import { PuntosMonitoreoContainer } from "../../../../styles/monitoreo/PuntosMonitore.style";
import { StyledSearchTextField } from "../../../../styles/TextField.style";
import CreatePuntos from "./Modals/Create";
import DeactivatePunto from "./Modals/Deactivate";
import EditPunto from "./Modals/Edit";

const PuntosMonitoreo = () => {

  const { idProyecto } = useParams();

  const { loadingPuntos, puntos, fetchPuntos } = useFetchPuntos(idProyecto);

  const [ openModal, setOpenModal ] = useState({
    create: false,
    edit: false,
    deactivate: false,
    activate: false,
  });

  const [ selectedId, setSelectedId ] = useState(null);

  const handleCreate = () => {
    setOpenModal(p => ({
      ...p,
      create: true
    }))
  }

  const handleCloseModal = (modal) => {
    setOpenModal(p => ({
      ...p,
      [modal]: false
    }));
  }

  return (
    <PuntosMonitoreoContainer>
      <div className="points-map-container">
        <MapView puntos={puntos}/>
      </div>
      <ListViewContainer className="points-list">
        <HeaderContainer>
          <div>
            <PrimaryTitle>Puntos de monitoreo</PrimaryTitle>
            <SecondaryTitle>{puntos.length} puntos de monitoreo</SecondaryTitle>
          </div>
          <EVButton
            label="Nuevo Punto"
            variant="contained"
            startIcon={<Add style={{ fontSize: 24 }}/>}
            onClick={handleCreate}
          />
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
          rowHeight={100}
          loading={loadingPuntos}
          columns={useColumnsListPuntos(setOpenModal, setSelectedId)}
          rows={puntos}
        />
        <CreatePuntos open={openModal.create} handleCloseModal={handleCloseModal} fetchPuntos={fetchPuntos}/>
        <EditPunto open={openModal.edit} handleCloseModal={handleCloseModal} fetchPuntos={fetchPuntos} selectedId={selectedId} setSelectedId={setSelectedId}/>
        <DeactivatePunto action={openModal.activate ? "activar" : "desactivar"} open={openModal.deactivate || openModal.activate} handleCloseModal={handleCloseModal} fetchPuntos={fetchPuntos} selectedId={selectedId} setSelectedId={setSelectedId}/>
      </ListViewContainer>
    </PuntosMonitoreoContainer>
  );
}
 
export default PuntosMonitoreo;
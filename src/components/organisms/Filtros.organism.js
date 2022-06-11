import { FilterList } from "@mui/icons-material";
import { Checkbox, Chip, Divider, Drawer, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useFetchTiposIncidentes } from "../../services/TipoIncidente.service";
import { useFetchTiposCausas } from "../../services/TiposCausas.service";
import { useFetchTiposImpactos } from "../../services/TiposImpactos.service";
import { FiltrosContainer } from "../../styles/containers/Filtros.style";
import EVButton from "../atoms/EVButton.atom";

const Filtros = ({ show, setShow, fetchInvestigacion }) => {

  const [selectedTiposCausa, setSelectedTiposCausa] = useState([]);
  const [selectedTiposImpacto, setSelectedTiposImpacto] = useState([]);
  const [selectedTiposIncidente, setSelectedTiposIncidente] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const { tiposCausa } = useFetchTiposCausas();
  const { tiposImpacto } = useFetchTiposImpactos();
  const { tiposIncidentes } = useFetchTiposIncidentes();

  const handleFilter = () => {
    const params = {};
    if (selectedTiposCausa.length > 0) {
      params.tiposCausa = selectedTiposCausa.map(tipo => tipo.id);
    }
    if (selectedTiposImpacto.length > 0) {
      params.tiposImpacto = selectedTiposImpacto.map(tipo => tipo.id);;
    }
    if (selectedTiposIncidente.length > 0) {
      params.tiposIncidente = selectedTiposIncidente.map(tipo => tipo.id);;
    }
    if (fechaInicio) {
      params.fechaInicio = fechaInicio;
    }
    if (fechaFin) {
      params.fechaFin = fechaFin;
    }
    fetchInvestigacion(params);
    setShow(false);
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "tiposCausa":
        setSelectedTiposCausa(value);
        break;
      case "tiposImpacto":
        setSelectedTiposImpacto(value);
        break;
      case "tiposIncidente":
        setSelectedTiposIncidente(value);
        break;
      case "fechaInicio":
        setFechaInicio(value);
        break;
      case "fechaFin":
        setFechaFin(value);
        break;
    }
  };

  return (
    <Drawer
      open={show}
      onClose={() => setShow(false)}
      anchor="right">
      <FiltrosContainer>
        <div className="filtros--header">
          <span className="filtros--header-title">Filtros</span>
          <EVButton
            label="Filtrar"
            variant="contained"
            startIcon={<FilterList style={{ fontSize: 24 }} />}
            onClick={handleFilter}
          />
        </div>
        <Divider />
        <div className="filtros--body">
          <InputLabel className="label-filtro">Fecha de Inicio</InputLabel>
          <TextField
            type="date"
            inputProps={{
              max: fechaFin
            }}
            name="fechaInicio"
            variant="outlined"
            onChange={handleChange}
            value={fechaInicio}
          />
          <InputLabel className="label-filtro">Fecha de Fin</InputLabel>
          <TextField
            type="date"
            inputProps={{
              min: fechaInicio
            }}
            name="fechaFin"
            variant="outlined"
            onChange={handleChange}
            value={fechaFin}
          />
          <InputLabel className="label-filtro">Tipo de Incidente</InputLabel>
          <Select
            multiple
            value={selectedTiposIncidente}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            name="tiposIncidente"
            // renderValue={(selected) => selected.map(selected => (selected.nombre)).join(', ')}
            renderValue={(selected) =>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(selected => <Chip key={selected.id} label={selected.nombre} />)}
              </Box>
            }
          >
            {tiposIncidentes.filter(tipoIncidente => tipoIncidente.id !== 0).map((tipoIncidente) => (
              <MenuItem key={tipoIncidente.id} value={tipoIncidente}>
                <Checkbox checked={selectedTiposIncidente.indexOf(tipoIncidente) > -1} />
                <ListItemText primary={tipoIncidente.nombre} />
              </MenuItem>
            ))}
          </Select>
          <InputLabel className="label-filtro">Tipo de Causa</InputLabel>
          <Select
            multiple
            placeholder="Tipo de Causa"
            value={selectedTiposCausa}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            name="tiposCausa"
            renderValue={(selected) =>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(selected => <Chip key={selected.id} label={selected.label} />)}
              </Box>
            }
          >
            {tiposCausa.filter(tipoCausa => tipoCausa.id !== 0).map((tipoCausa) => (
              <MenuItem key={tipoCausa.id} value={tipoCausa}>
                <Checkbox checked={selectedTiposCausa.indexOf(tipoCausa) > -1} />
                <ListItemText primary={tipoCausa.label} />
              </MenuItem>
            ))}
          </Select>
          <InputLabel className="label-filtro">Tipo de Impacto</InputLabel>
          <Select
            multiple
            placeholder="Tipo de Impacto"
            value={selectedTiposImpacto}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            name="tiposImpacto"
            renderValue={(selected) =>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(selected => <Chip key={selected.id} label={selected.label} />)}
              </Box>
            }
          >
            {tiposImpacto.filter(tipoImpacto => tipoImpacto.id !== 0).map((tipoImpacto) => (
              <MenuItem key={tipoImpacto.id} value={tipoImpacto}>
                <Checkbox checked={selectedTiposImpacto.indexOf(tipoImpacto) > -1} />
                <ListItemText primary={tipoImpacto.label} />
              </MenuItem>
            ))}
          </Select>
        </div>
      </FiltrosContainer>
    </Drawer>
  );
}

export default Filtros;
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useForm from "../../../hooks/useForm.hook";
import { useFetchDetalleInvestigacion } from "../../../services/Investigaciones.service";
import { ListViewContainer } from "../../../styles/containers/View.style";
import { StyledTab, StyledTabs } from "../../../styles/Tabs.style";
import CausasAcciones from "./CausasAcciones";
import GeneralData from "./GeneralData";
import Impact from "./Impact";
import PlanAcciones from "./PlanAcciones";

const DetalleInvestigacion = () => {

  const { id } = useParams();

  const [tab, setTab] = useState(0);

  const { loadingInvestigacion, investigacion } = useFetchDetalleInvestigacion(id);

  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    proyecto: {
      id: 0,
      label: "Selecciona un proyecto",
      responsable_propio: "",
      responsable_externo: "",
      puntos: []
    },
    punto: {
      id: 0,
      label: "Selecciona un punto de monitoreo",
      utmx: null,
      utmy: null
    },
    tipoIncidente: {
      id: 0,
      label: "Selecciona un tipo de incidente"
    },
    detalle_evento: '',
    fecha_incidente: '',
    hora_incidente: '',
    localidad: '',
    zona_sector: '',
    distrito: '',
    provincia: '',
    departamento: '',
    coordenada_norte: '',
    coordenada_este: '',
    detalle_ubicacion: '',
    impactos: [],
    personas: [],
    causas: [],
    acciones: []
  });

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  useEffect(() => {
    if (!loadingInvestigacion) {
      setValues(investigacion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingInvestigacion]);

  useEffect(() => {
    if (!loadingInvestigacion) {
      setValues(s => ({
        ...s,
        punto: investigacion.punto
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.proyecto]);

  return (
    <ListViewContainer>
      <Box style={{ marginBottom: '1.5rem' }}>
        <StyledTabs value={tab} onChange={handleChange}>
          <StyledTab label="Datos Generales" />
          {values.step >= 2 ? <StyledTab label="Consecuencias" /> : null}
          {values.step >= 3 ? <StyledTab label="Causas inmediatas" /> : null}
          {values.step >= 4 ? <StyledTab label="Plan de acciones" /> : null}
        </StyledTabs>
      </Box>
      {tab === 0 ?
        <GeneralData
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          setTab={setTab}
        />
        : null
      }
      {tab === 1 ?
        <Impact
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          setTab={setTab}
        />
        : null
      }
      {tab === 2 ?
        <CausasAcciones
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          setTab={setTab}
        />
        : null
      }
      {tab === 3 ?
        <PlanAcciones
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          setTab={setTab}
        />
        : null
      }
    </ListViewContainer>
  );
}

export default DetalleInvestigacion;
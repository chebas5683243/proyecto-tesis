import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import UbicacionIcon from "../../../assets/ubicacion-icon.png";
import EmpresaIcon from "../../../assets/empresa-icon.png";
import CalendarIcon from "../../../assets/calendar-icon.png";
import CheckIcon from "../../../assets/check-icon.png";
import { GeneralInfoContainer } from "../../../styles/monitoreo/GeneralInfo.style";
import imgProyecto from "../../../assets/image10.png";

const GeneralInfo = ({ values }) => {
  
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState([]);

  const updateDisplayedStep = (index) => {
    setActiveStep(index);
  }

  const getEstadoFase = (estado) => {
    switch (estado) {
      case 1: return "Planeado";
      case 2: return "En Progreso";
      case 3: return "Terminado";
      default: return "Terminado";
    }
  }

  const getEstadoProyecto = () => {
    switch (values.estado) {
      case 0: return "Planeado";
      case 1: return "En Progreso";
      case 2: return "Terminado";
      default: return "Terminado";
    }
  }

  useEffect(() => {
    const setEstadoFases = () => {
      const fasesCompletadas = [];
      let foundFirstInProgress = false;
      values.fases.map((fase, index) => {
        if(fase.estado === 2 && !foundFirstInProgress) {
          setActiveStep(index);
          foundFirstInProgress = true;
        }
        if(fase.estado === 3) fasesCompletadas.push(true);
        else fasesCompletadas.push(false);
      });
      setCompleted(fasesCompletadas);
    }

    setEstadoFases();
  }, [values.fases])

  return (
    <GeneralInfoContainer>
      <div className="info-card">
        <img src={imgProyecto} alt="imagen-proyecto"/>
        <div className="info-container">
          <span className="codigo-proyecto">Código: {values.codigo}</span>
          <span className="nombre-proyecto">{values.nombre}</span>
          <div className="detalle-container">
            <img src={UbicacionIcon} alt="icono-ubicacion"/>
            <span>{values.ubicacion}</span>
          </div>
          <div className="detalle-container">
            <img src={CalendarIcon} alt="icono-calendario"/>
            <span>{values.fecha_inicio} → {values.fecha_fin || 'presente'}</span>
          </div>
          <div className="detalle-container">
            <img src={CheckIcon} alt="icono-empresa" />
            <span>{getEstadoProyecto()}</span>
          </div>
          <div className="detalle-container">
            <img src={EmpresaIcon} alt="icono-empresa" />
            <span>Empresa Ejecutora: {values.empresa_ejecutora.label}</span>
          </div>
          <p className="descripcion-proyecto">
            {values.descripcion}
          </p>
          {!!values.fecha_mas_reciente && <span className="ultimo-registro-proyecto">Último monitoreo el {values.fecha_mas_reciente.fecha} a la(s) {values.fecha_mas_reciente.hora}</span>}
        </div>
      </div>
      <div className="fases-proyectos">
        <span className="titulo-fases">Fases del Proyecto</span>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {values.fases.map((fase, index) => (
            <Step key={fase.id} completed={completed[index]}>
              <StepLabel
                onClick={() => updateDisplayedStep(index)}
                optional={
                  <span className="estado-fase">
                    {getEstadoFase(fase.estado)}
                  </span>
                }
              >
                <span className="titulo-fase">{fase.nombre}</span>
              </StepLabel>
              <StepContent>
                <span className="descripcion-fase">{fase.descripcion}</span>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="widgets-container">
        <div className="widget">
          <span className="big-number">{values.cantidad_puntos}</span>
          <span className="widget-description">Puntos de Monitoreo</span>
        </div>
        <div className="widget">
          <span className="big-number">{values.cantidad_incidentes}</span>
          <span className="widget-description">Incidentes asociados al proyecto</span>
        </div>
        <div className="widget">
          <span className="big-number">{values.cantidad_registros}</span>
          <span className="widget-description">registros de monitoreo realizados</span>
        </div>
      </div>
    </GeneralInfoContainer>
  );
}
 
export default GeneralInfo;
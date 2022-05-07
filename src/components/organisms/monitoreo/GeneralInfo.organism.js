import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import UbicacionIcon from "../../../assets/ubicacion-icon.png";
import EmpresaIcon from "../../../assets/empresa-icon.png";
import CalendarIcon from "../../../assets/calendar-icon.png";
import CheckIcon from "../../../assets/check-icon.png";
import { GeneralInfoContainer } from "../../../styles/monitoreo/GeneralInfo.style";
import imgProyecto from "../../../assets/image10.png";

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];


const GeneralInfo = ({ values }) => {
  
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState([true, false, false]);

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
            <span>Ejecutado</span>
          </div>
          <div className="detalle-container">
            <img src={EmpresaIcon} alt="icono-empresa" />
            <span>Empresa Ejecutora: {values.empresa_ejecutora.label}</span>
          </div>
          <p className="descripcion-proyecto">
            {values.descripcion}
          </p>
          <span className="ultimo-registro-proyecto">Último monitoreo hace 1 día</span>
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
          <span className="big-number">0</span>
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
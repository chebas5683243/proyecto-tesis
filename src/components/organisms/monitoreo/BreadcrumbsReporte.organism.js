import { Breadcrumbs, Link } from "@mui/material";
import { useContext } from "react";
import { ProjectContext } from "../../../context/ProjectContext";

const BreadcrumbsReporte = () => {

  const { registroId, setRegistroId, puntoId, setPuntoId } = useContext(ProjectContext);

  const redirectToListaPuntos = () => {
    setPuntoId(null);
    setRegistroId(null);
  }

  const redirectToPunto = () => {
    setRegistroId(null);
  }

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link underline="hover" color="inherit" onClick={redirectToListaPuntos}>
        Puntos de Monitoreo
      </Link>
      <Link underline="hover" color="inherit" onClick={redirectToPunto}>
        EV-PMA-{String(puntoId).padStart(6, '0')}
      </Link>
      <Link underline="hover" color="inherit">
        EV-REG-{String(registroId).padStart(6, '0')}
      </Link>
    </Breadcrumbs>
  );
}
 
export default BreadcrumbsReporte;
import { Breadcrumbs, Link } from "@mui/material";
import { useContext } from "react";
import { ProjectContext } from "../../../context/ProjectContext";

const BreadcrumbsReporte = () => {

  const { registroId, setRegistroId, puntoId, setPuntoId } = useContext(ProjectContext);

  const redirectToListaPuntos = (e) => {
    e.preventDefault();
    setPuntoId(null);
    setRegistroId(null);
  }

  const redirectToPunto = (e) => {
    e.preventDefault();
    setRegistroId(null);
  }

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link underline="hover" color="inherit" onClick={redirectToListaPuntos} href="">
        Puntos de Monitoreo
      </Link>
      <Link underline="hover" color="inherit" onClick={redirectToPunto} href="">
        EV-PMA-{String(puntoId).padStart(6, '0')}
      </Link>
      <Link underline="hover" color="inherit">
        EV-REG-{String(registroId).padStart(6, '0')}
      </Link>
    </Breadcrumbs>
  );
}
 
export default BreadcrumbsReporte;
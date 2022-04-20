import { ProyectosContainer } from "../../../styles/monitoreo/GridProyecto.style";
import imgProyecto from "../../../assets/image10.png";
import { useHistory } from "react-router";
import { useContext } from "react";
import { ProjectContext } from "../../../context/ProjectContext";

const GridProyecto = ({ proyectos, loading }) => {

  const history = useHistory();

  const { setProyectoId } = useContext(ProjectContext);

  const handleClick = (id) => {
    setProyectoId(id);
    history.push("/monitoreoAmbiental/" + id);
  }

  return (
    <ProyectosContainer>
      {proyectos.map(proyecto => 
        <div key={proyecto.id} className="card-proyecto" onClick={() => handleClick(proyecto.id)}>
          <img src={imgProyecto} alt="imagen proyecto"/>
          <div className="info-glass">
            <p>{proyecto.nombre}</p>
            <span>Último registro hace 2 horas</span>
          </div>
        </div>
      )}
    </ProyectosContainer>
  );
}
 
export default GridProyecto;
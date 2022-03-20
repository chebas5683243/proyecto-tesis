import { NoAplicaContainer } from "../../../styles/parametros/NoAplica.style";

const NoAplica = () => {
  return (
    <NoAplicaContainer>
      <span className="titulo-estandar">
        No aplica parametrización
      </span>
      <div className="texto-no-aplica">
        El presente parámetro utiliza valores cualitativos para describir el estado actual del componente natural, por 
        lo que no es posible tener una escala cuantitativa de los diversos valores que este parámetro puede tomar.
      </div>
    </NoAplicaContainer>
  );
}
 
export default NoAplica;
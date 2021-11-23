import LogoImg from "../../assets/logo.png";
import LogoBlancoImg from "../../assets/logo-blanco.png";
import { StyledLogo } from "../../styles/Logo.style";

const Logo = ({isSidebar}) => {
  return (
    <StyledLogo isSidebar={isSidebar}>
      <img src={!isSidebar ? LogoImg : LogoBlancoImg} alt="Logo EcoViewer"/>
      <div>
        <span className="Eco">Eco</span>
        <span className="Viewer">Viewer</span>
      </div>
    </StyledLogo>
  );
}
 
export default Logo;
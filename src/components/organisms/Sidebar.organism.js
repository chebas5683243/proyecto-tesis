import { useContext, useRef, useEffect } from "react";
import { NavbarContext } from "../../context/NavbarContext";
import { SidebarContainer, TitleContainer, OptionsContainer } from "../../styles/containers/Sidebar.style";
import { SidebarOptions } from "../../constants/SidebarOptions.constants";
import SidebarOption from "../atoms/SidebarOption.atom";
import Hamburger from "../atoms/Hambuger.atom";
import Logo from "../atoms/Logo.atom";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {

  const { show, setShow } = useContext(NavbarContext);

  const { infoUsuario } = useContext(UserContext);

  const sidebarRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!sidebarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <SidebarContainer show={show} ref={sidebarRef}>
      <TitleContainer>
        <Hamburger color='#fff'/>
        <Logo isSidebar={true}/>
      </TitleContainer>
      <OptionsContainer>
        {SidebarOptions.filter(option => option.usersTypeAllowed.includes(infoUsuario.tipo)).map(option => (
          <SidebarOption
            key={option.name}
            optionName={option.name}
            optionLink={option.linkTo}
          />
        ))}
      </OptionsContainer>
    </SidebarContainer>
  );
}
 
export default Sidebar;
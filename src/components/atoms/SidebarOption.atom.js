import { useContext } from "react";
import { useHistory } from "react-router";
import { StyledOption } from "../../styles/SidebarOption.style";
import { NavbarContext } from "../../context/NavbarContext";

const SidebarOption = ({optionName, optionLink}) => {

  const history = useHistory();
  const { setShow } = useContext(NavbarContext);

  const handleClick = () => {
    setShow(false);
    history.push(optionLink);
  }

  return (
    <StyledOption onClick={handleClick}>
      <span>{optionName}</span>
    </StyledOption>
  );
}
 
export default SidebarOption;
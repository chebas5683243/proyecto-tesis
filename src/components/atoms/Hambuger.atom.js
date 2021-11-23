import { useContext } from "react";
import { Menu } from '@mui/icons-material';
import { NavbarContext } from "../../context/NavbarContext";

const Hamburger = ({color}) => {

  const { setShow } = useContext(NavbarContext);

  const handleClick = () => {
    setShow(show => !show);
  }

  return (
    <Menu
      style={{cursor: 'pointer', fontSize: 24, color: color, marginRight: 15}}
      onClick={handleClick}
    />
  );
}
 
export default Hamburger;
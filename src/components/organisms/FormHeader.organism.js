import { KeyboardArrowUpOutlined } from "@mui/icons-material";

const FormHeader = ({ isExpanded, expand, title }) => {

  return (
    <div className="form-header">
      <span>{title}</span>
      <div className="divider"></div>
      <div className="arrow" onClick={expand}>
        <KeyboardArrowUpOutlined className={isExpanded ? null : "rotated"}/>
      </div>
    </div>
  );
}
 
export default FormHeader;
import { TextField, Autocomplete } from '@mui/material';
import { withStyles } from '@mui/styles';
import styled from "styled-components";

export const StyledTextField = withStyles((theme) => ({
  root: {
    background: 'white',
    borderRadius: 10,
    
    "& fieldset": {
      borderRadius: 10,
    },
    "& .MuiOutlinedInput-input": {
      fontSize: 14,
    }
  }
}))(TextField);

export const StyledCustomTextField = styled(StyledTextField)`
  width: ${props => props.wsize}%;
  margin-bottom: 20px;

  label, label.Mui-disabled {
    color: ${props => props.theme.inputSecondaryColor};
  }

  label.Mui-focused {
    color: ${props => props.theme.inputPrimaryColor};
  }

  .MuiOutlinedInput-root {
    &.Mui-disabled {
      background-color: ${props => props.theme.disabledColor};
    }

    input:disabled, textarea:disabled{
      -webkit-text-fill-color: #000;
      color: #000;
    }

    fieldset {
      border-color: ${props => props.theme.inputSecondaryColor};
    }

    :hover fieldset {
      border-color: ${props => props.theme.inputPrimaryColor};
    }

    &.Mui-focused fieldset {
      border: 2px solid ${props => props.theme.inputPrimaryColor};
    }

    &.Mui-disabled fieldset {
      -webkit-text-fill-color: #000;
      border-color: ${props => props.theme.inputSecondaryColor};
    }
  }
`;

export const StyledLoginField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      fontSize: 14,
    }
  }
}))(TextField);

export const StyledCustomLoginField = styled(StyledLoginField)`
  width: 100%;
  margin-bottom: 20px;

  label {
    color: ${props => props.theme.inputSecondaryColor};
  }

  label.Mui-focused {
    color: ${props => props.theme.inputPrimaryColor};
  }

  .MuiInput-underline:after {
    border-bottom-color: ${props => props.theme.inputPrimaryColor};
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${props => props.theme.inputSecondaryColor};
    }
    :hover fieldset {
      border-color: ${props => props.theme.inputPrimaryColor};
    }
    .Mui-focused fieldset {
      border-color: ${props => props.theme.inputPrimaryColor};
    }
  }
`;

export const StyledSearchTextField = withStyles((theme) => ({
  root: {
    width: 400,
    background: 'white',
    borderRadius: 10,
    
    "& fieldset": {
      borderRadius: 10,
    },
    "& .MuiOutlinedInput-input": {
      height: "2.25rem",
      padding: 0,
      fontSize: ".875rem", 
    }
  }
}))(TextField);

export const StyledAutoComplete = withStyles(() => ({

}))(Autocomplete);

const AuxTextField = TextField;

export const ParamsTextField = withStyles((theme) => ({
  root: {
    width: 150,
    background: 'white',
    
    "& fieldset": {
      borderRadius: 0,
    },
    "& .MuiOutlinedInput-input": {
      height: "2.3125rem",
      padding: "0 14px 0 14px",
      fontSize: ".875rem", 
    },
    "& .Mui-disabled": {
      background: theme.disabledColor,
    }
  }
}))(AuxTextField);
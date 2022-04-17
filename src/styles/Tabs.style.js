import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';

export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(
  ({ theme }) => ({
    borderBottom: "2px solid " + theme.inputSecondaryColor,
    '& .MuiTabs-indicator': {
      display: 'none',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      display: 'none',
    },
  })
);

export const StyledTab = muiStyled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: 400,
    color: theme.inputSecondaryColor,
    '&:hover': {
      borderRadius: "15px 15px 0 0",
      backgroundColor: theme.inputSecondaryColorLight,
      opacity: 1,
    },
    '&.Mui-selected': {
      borderRadius: "15px 15px 0 0",
      color: '#fff',
      fontWeight: 700,
      backgroundColor: theme.inputSecondaryColor,
    },
  }),
);
import styled from "styled-components";

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 35px;
  }

  div {
    margin-left: 5px;
    font-size: 20px;

    .Eco {
      font-weight: 700;
      color: ${(props) => !props.isSidebar ? props.theme.palette.primary.main : '#fff'};
    }

    .Viewer {
      font-weight: 400;
      color: ${(props) => !props.isSidebar ? props.theme.inputSecondaryColor : '#fff'};
    }
  }
`;
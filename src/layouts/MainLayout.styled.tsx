
import styled from "@emotion/styled"
import theme from "../components/theme";
import { Box } from "@mui/material";


export const StyleHraderBox = styled(Box)({
     height: '140px'
})



export const StyleMainContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showHeader',
})(({showHeader = true }: { showHeader?: boolean }) => ({
  display: 'flex',
  height: `calc(100vh - ${showHeader ? '140px' : '0px'})`,
  marginTop: showHeader ? '10px' : '0px',
  zIndex: 10,
}));

export const StyleLeftpanelBox = styled(Box)({
     width: '300px', 
     height: '100%'
})

export  const StyleOutletBox = styled(Box,{
  shouldForwardProp: (prop) => prop !== 'showLeftPanel',
})(({ showLeftPanel = true }: {  showLeftPanel?: boolean }) => ({
  width: showLeftPanel ? 'calc(100% - 305px)' : '100%',
  padding: '20px',
  height: '100%',
  alignItems: 'start',
}));
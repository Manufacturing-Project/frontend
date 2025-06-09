import styled from "@emotion/styled";
import { Box, Typography , Button, TextField } from "@mui/material";
import theme from "../../theme";


export const StyledContainerBox = styled(Box)({
    height: "100%",
    background: theme.colors.secondary_background_color,
})

export const StyledTitleBox = styled(Box)({
    marginLeft: "60px"
})

export const StyledTitle = styled(Typography)({
     fontSize: "28px", 
     fontWeight: 500, 
     lineHeight: "32px" ,
     variant: "h6"
})

export const StyleAddButton = styled(Button)({
    backgroundColor: theme.colors.primary_color_green,
    color: theme.colors.secondary_background_color,
    marginTop: "20px",
})
export const StyleItemBoxContainer = styled(Box)({
     paddingLeft: "80px", 
     paddingTop: "20px"
})
export const StyleTextField = styled(TextField)({
    margin: "8px",
    width: "100%"
    
})

export const StyleButton = styled(Button)({
   color: "primary"
})
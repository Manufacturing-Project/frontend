import styled from "@emotion/styled";
import { Box  , Typography} from "@mui/material";
import theme from "../../theme"; 

export const StyledEmptyInfoBox = styled(Box)({
  textAlign: 'center', 
  marginTop: '40px'

})

export const StyledButton = styled('button')({
    backgroundColor: theme.colors.primary_color_green,
    color: theme.colors.secondary_background_color,
    marginTop: '20px',
    varient: 'contained',
},
)

export const StyledTypography = styled(Typography)({
  color: theme.colors.emtybox_color,
  marginBottom: '20px',
});
// src/pages/register/Register.styles.ts
import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import theme from "../../components/theme";



export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "80%",
  height: "100vh",
  marginLeft: "200px",
});

export const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
});

export const FormWrapper = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  marginLeft: 20,
});

export const WelcomeText = styled(Typography)({
  marginLeft: -220,
});

export const StyledButton = styled(Button)({
  backgroundColor: theme.colors.primary_color_green,
  color: theme.colors.secondary_background_color,
  marginTop: 40,
  width: 350,
  height: 36,
  "&:disabled": {
    backgroundColor: theme.colors.primary_color_green,
    opacity: 0.5,
    color: theme.colors.secondary_background_color,
  },
});

export const ImageWrapper = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledTypography = styled(Typography)({
  fontSize: 12,
  alignSelf: "center",
  marginTop: 20,
  marginLeft: 60,
});

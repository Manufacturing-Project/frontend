import { Box, Button, styled } from "@mui/material";
import theme from "../../components/theme";

export const Container = styled(Box)({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
});

export const ButtonsWrapper = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
});

export const ButtonsGroup = styled(Box)<{ gap?: string; marginTop?: string }>(({ gap = "16px", marginTop = "0" }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap,
  marginTop,
}));

export const StyledButton = styled(Button)({
  backgroundColor: theme.colors.primary_color_green,
  color: "#fff",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: theme.colors.primary_color_green,
    opacity: 0.9,
  },
});

export const NextButton = styled(StyledButton)({
  width: "120px",
  height: "40px",
});

export const SmallButton = styled(StyledButton)({
  width: "99px",
  height: "36px",
});

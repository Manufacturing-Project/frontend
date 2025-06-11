import { Box, styled } from "@mui/material";
import theme from "../../../components/theme";

export const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "60px",
  backgroundColor: theme.colors.secondary_background_color,
  height: "100%",
  boxSizing: "border-box",
});

export const Section = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "40px 24px", // row gap 40px, column gap 24px
  alignItems: "start",
});

export const VariantSwitchWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  gridColumn: "span 1",
});

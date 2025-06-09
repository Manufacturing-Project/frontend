import React from "react";
import { Link } from "react-router-dom";
import defaultLogo from "../../../assets/LogoOriginal 1.png";
import { StyledImg } from "./Logo.styles";

export const Logo: React.FC = () => {
  return (
    <Link to="/dashboard" style={{ display: "inline-block" }}>
      <StyledImg src={defaultLogo} alt="Logo" />
    </Link>
  );
};


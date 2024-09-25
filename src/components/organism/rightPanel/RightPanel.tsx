import React from "react";
import { Box } from "@mui/material";
import { AddRawMaterial } from "../../molecules"; // Import your AddRawMaterial component

interface RightPanelProps {
  categoryoption: { id: string; name: string }[]; // Options for category select box
  unitoption: { id: string; name: string }[]; // Options for unit select box
  onsubmit: (
    m_name: string,
    m_code: string,
    category: string,
    unit: string,
    reorderlevel: number,
    description: string
  ) => void;
  width: string; // Receive width of right panel based on left panel and header
  height: string; // Receive height of right panel based on left panel and header
}

const RightPanel: React.FC<RightPanelProps> = ({
  categoryoption,
  unitoption,
  onsubmit,
  width,
  height,
}) => {
  return (
    <Box
      sx={{
        width: width, // Set the width dynamically based on props
        height: height, // Set the height dynamically based on props
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "16px",
        backgroundColor: "#f4f6f8",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <AddRawMaterial
        categoryoption={categoryoption}
        unitoption={unitoption}
        onsubmit={onsubmit}
      />
    </Box>
  );
};

export { RightPanel };

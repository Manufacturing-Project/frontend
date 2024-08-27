import React from "react";
import { TableCell, Typography } from "@mui/material";
import { lightBlue, red } from "@mui/material/colors";

interface TableCellAtomProps {
  value: any;
  format?: (value: any) => string;
  isImage?: boolean;
  columnIndex: number;
}

const TableCells: React.FC<TableCellAtomProps> = ({
 
  value,
  format,
  isImage,
  columnIndex,
  
}) => {
  //   const theme = useTheme();
  //   const backgroundColor = columnIndex % 2 === 0 ? theme.custom.table.evenColumn : theme.custom.table.oddColumn;

  const backgroundColor = columnIndex % 2 === 0 ? red[500] : lightBlue[500];

  return (
    <TableCell
      sx={{ 
        backgroundColor,
        textAlign: 'center',
        padding: '8px',
        alignItems: 'center',
        
      }}
    >
      {isImage ? (
        <img
          src={value}
          alt="Material"
          style={{ width: "40px", height: "40px" }}
        />
      ) : format && typeof value === "number" ? (
        <Typography variant="body1">{format(value)}</Typography>
      ) : (
        <Typography variant="body1">{value}</Typography>
      )}
    </TableCell>
  );
};

export { TableCells, type TableCellAtomProps };

export interface TableRowData {
  code: string;
  name: string;
  reorderLevel: number;
  unitOfMeasure: string;
  description: string;
}

export interface EditDialogData {
  open: boolean;
  rowIndex: number;
  data: TableRowData | null;
}

export interface GeneratedMaterialTableProps {
  onMaterialsChange?: (materials: TableRowData[]) => void;
}

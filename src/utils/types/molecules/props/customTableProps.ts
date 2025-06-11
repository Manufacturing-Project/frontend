// CustomTable.props.ts

export interface Column {
  header: string;
  accessor: string;
  align?: 'left' | 'right' | 'center';
  width?: string; // e.g., '150px', '20%'
}

export interface CustomTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
}

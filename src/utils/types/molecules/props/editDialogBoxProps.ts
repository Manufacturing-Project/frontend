

export interface FieldConfig {
  label: string;
  name: string;
}

export interface EditDialogBoxProps {
  open: boolean;
  onClose: () => void;
  initialData: Record<string, any>;
  fields: FieldConfig[];
  onSave: (updatedData: Record<string, any>) => void;
  title?: string;
}

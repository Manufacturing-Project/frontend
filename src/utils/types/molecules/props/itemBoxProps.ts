export interface Item {
  id: string;
  name: string;
}

export interface ItemboxProps {
  items: Item[];
  color: string;
  height: string;
  rowPadding: string;
  onUpdate: (id: string, updatedName: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  boxShadow?: string;
}
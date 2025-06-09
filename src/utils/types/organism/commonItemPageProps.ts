export interface CommonItemPageProps {
  title: string;
  items: { id: string; name: string }[];
  buttonName: string;
  createItem: (name: string) => Promise<void>;
  updateItem: (id: string, name: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}
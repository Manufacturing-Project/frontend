export interface SearchBarProps {
  options: string[]; 
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
}
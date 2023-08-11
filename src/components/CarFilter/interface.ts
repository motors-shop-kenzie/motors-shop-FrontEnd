export interface Car {
  id: string;
  brand: string;
  model: string;
  color: string;
  year: number;
  gasoline: string;
}

export interface CarFilterProps {
  cars: Car[];
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  brand: string | null;
  model: string | null;
  color: string | null;
  year: number | null;
  gasoline: string | null;
}

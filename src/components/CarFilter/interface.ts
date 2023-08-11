export interface Car {
  id: string;
  brand: string;
  model: string;
  color: string;
  year: number;
  gasoline: string;
  img: {
    id: string;
    url_img: string;
    carProductsId: string;
  }[];
  name: string;
  coverImg: string;
  price: number;
  km: number;
  description: string;
  tablePife: number;
  business: boolean;
}

export interface CarFilterProps {
  cars: Car[];
  onFilterChange: (filteredCars: Car[]) => void;
}

export interface FilterOptions {
  brand: string | null;
  model: string | null;
  color: string | null;
  year: number | null;
  gasoline: string | null;
}

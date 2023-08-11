import { ChangeEvent, useState } from "react";
import { Car, CarFilterProps, FilterOptions } from "./interface";

export default function CarFilter({ cars, onFilterChange }: CarFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    brand: null,
    model: null,
    color: null,
    year: null,
    gasoline: null,
  });

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string | number | null
  ) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);

    applyFilters(newFilters);
  };

  const applyFilters = (filters: FilterOptions) => {
    const filteredCars = cars.filter((car) =>
      Object.entries(filters).every(
        ([filterType, filterValue]) =>
          filterValue === null || car[filterType as keyof Car] === filterValue
      )
    );

    onFilterChange(
      Object.values(filters).some((value) => value !== null)
        ? filteredCars
        : cars
    );
  };

  const renderSelect = (filterType: keyof FilterOptions, options: string[]) => (
    <div key={filterType}>
      <h3>{filterType}</h3>
      <select
        value={selectedFilters[filterType] || ""}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleFilterChange(
            filterType,
            e.target.value !== "" ? e.target.value : null
          )
        }
      >
        <option value="">Todos</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const brandOptions = [
    "General Motors",
    "Fiat",
    "Ford",
    "Honda",
    "Porsche",
    "Volswagen",
  ];
  const modelOptions = [
    "Civic",
    "Corolla",
    "Cruze",
    "Fit",
    "Gol",
    "Ka",
    "Onix",
    "Porsche 718",
  ];
  const colorOptions = ["Azul", "Branca", "Cinza", "Prata", "Preta", "Verde"];
  const yearOptions = [2022, 2021, 2018, 2015, 2013, 2012, 2010];
  const gasolineOptions = ["Elétrico", "Flex", "Híbrido"];

  return (
    <div>
      {renderSelect("brand", brandOptions)}
      {renderSelect("model", modelOptions)}
      {renderSelect("color", colorOptions)}
      {renderSelect("year", yearOptions.map(String))}
      {renderSelect("gasoline", gasolineOptions)}
    </div>
  );
}

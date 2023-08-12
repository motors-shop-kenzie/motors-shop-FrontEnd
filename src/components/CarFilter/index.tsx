"use client";

import { useState } from "react";
import { CarFilterProps, FilterOptions } from "./interface";

export default function CarFilter({ cars }: CarFilterProps) {
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
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredCars = cars.filter((car) => {
    const { brand, model, color, year, gasoline } = selectedFilters;

    return (
      (!brand || car.brand === brand) &&
      (!model || car.model === model) &&
      (!color || car.color === color) &&
      (!year || car.year === year) &&
      (!gasoline || car.gasoline === gasoline)
    );
  });

  const renderFilterList = (
    filterType: keyof FilterOptions,
    options: string[] | number[]
  ) => (
    <div key={filterType}>
      <h3>{filterType}</h3>
      <ul>
        <li>
          <button
            className={selectedFilters[filterType] === null ? "selected" : ""}
            onClick={() => handleFilterChange(filterType, null)}
          >
            Todos
          </button>
        </li>
        {options.map((option) => (
          <li key={option.toString()}>
            <button
              className={
                selectedFilters[filterType] === option ? "selected" : ""
              }
              onClick={() => handleFilterChange(filterType, option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const brandOptions = [
    "General Motors",
    "Fiat",
    "Ford",
    "Honda",
    "Porsche",
    "Volkswagen",
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
  const yearOptions = [2022, 2021, 2020, 2018, 2015, 2013, 2012, 2010];
  const gasolineOptions = ["Elétrico", "Flex", "Híbrido"];

  return (
    <div>
      {renderFilterList("brand", brandOptions)}
      {renderFilterList("model", modelOptions)}
      {renderFilterList("color", colorOptions)}
      {renderFilterList("year", yearOptions)}
      {renderFilterList("gasoline", gasolineOptions)}
    </div>
  );
}

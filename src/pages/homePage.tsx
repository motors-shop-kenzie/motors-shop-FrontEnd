"use client";

import { useContext, useState } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { NavBar } from "@/components/NavBar";
import { ProductBox } from "@/components/ProductBox";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { FilterOptions } from "@/components/CarFilter/interface";
import styles from "./styles.module.scss";

export default function HomePage() {
  const { cars, setCars } = useContext(CarsContext);

  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    brand: null,
    model: null,
    color: null,
    year: null,
    gasoline: null,
  });

  const [filterActive, setFilterActive] = useState<boolean>(false);

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string | number | null
  ) => {
    if (selectedFilters[filterType] === value) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: null,
      }));
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: value,
      }));
    }
    setFilterActive(!filterActive);
  };

  const filterCars = cars.filter((car) => {
    const { brand, model, color, year, gasoline } = selectedFilters;

    return (
      (!brand || car.brand === brand) &&
      (!model || car.model === model) &&
      (!color || car.color === color) &&
      (!year || car.year === year) &&
      (!gasoline || car.gasoline === gasoline)
    );
  });

  const brandOptions = filterCars.map((data) => data.brand);
  const modelOptions = filterCars.map((data) => data.model);
  const colorOptions = filterCars.map((data) => data.color);
  const yearOptions = filterCars.map((data) => data.year);
  const gasolineOptions = filterCars.map((data) => data.gasoline);

  return (
    <main className={styles.body}>
      <NavBar dealer logged />
      <div className={styles.bg_img}></div>
      <section className={styles.car_shop}>
        <div>
          <ul>
            <li>
              <h3>Marca</h3>
              {brandOptions.map((option, index) => (
                <button
                  key={index}
                  className={
                    selectedFilters.brand === option && filterActive
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleFilterChange("brand", option)}
                >
                  {option}
                </button>
              ))}
            </li>
            <li>
              <h3>Modelo</h3>
              {modelOptions.map((option, index) => (
                <button
                  key={index}
                  className={
                    selectedFilters.model === option && filterActive
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleFilterChange("model", option)}
                >
                  {option}
                </button>
              ))}
            </li>
            <li>
              <h3>Cor</h3>
              {colorOptions.map((option, index) => (
                <button
                  key={index}
                  className={
                    selectedFilters.color === option && filterActive
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleFilterChange("color", option)}
                >
                  {option}
                </button>
              ))}
            </li>
            <li>
              <h3>Year</h3>
              {yearOptions.map((option, index) => (
                <button
                  key={index}
                  className={
                    selectedFilters.year === option && filterActive
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleFilterChange("year", option)}
                >
                  {option}
                </button>
              ))}
            </li>
            <li>
              <h3>Gasolina</h3>
              {gasolineOptions.map((option, index) => (
                <button
                  key={index}
                  className={
                    selectedFilters.gasoline === option && filterActive
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleFilterChange("gasoline", option)}
                >
                  {option}
                </button>
              ))}
            </li>
          </ul>
        </div>

        <ul>
          {modelOptions.map((model, index) => {
            return (
              <li key={index}>
                <button
                  onClick={() =>
                    setCars(filterCars.filter((data) => data.model === model))
                  }
                >
                  {model}
                </button>
              </li>
            );
          })}
        </ul>
        <ProductBox>
          {filterCars.length === 0 ? (
            <p>Não há carros disponíveis.</p>
          ) : (
            filterCars.map((car) => <ProductCard key={car.id} car={car} />)
          )}
        </ProductBox>
      </section>
      <Footer />
    </main>
  );
}

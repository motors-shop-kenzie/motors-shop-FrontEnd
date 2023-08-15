import { useContext, useState } from "react";
import { CarsContext } from "@/contexts/Cars/CarsContext";
import { NavBar } from "@/components/NavBar";
import { ProductBox } from "@/components/ProductBox";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import styles from "./styles.module.scss";
import { Car, FilterOptions } from "@/interfaces/CarFilter";

export default function HomePage() {
  const { cars, setCars } = useContext(CarsContext);

  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    brand: null,
    model: null,
    color: null,
    year: null,
    gasoline: null,
  });

  const [kmValue, setKmValue] = useState<number>(0);
  const [priceValue, setPriceValue] = useState<number>(0);

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string | number | null
  ) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? null : value,
    }));
  };

  const filterCars = cars.filter((car) => {
    return (
      Object.entries(selectedFilters).every(([filterType, filterValue]) => {
        if (!filterValue) return true;
        const carProperty = car[filterType as keyof Car];
        return carProperty === filterValue;
      }) &&
      (!kmValue || car.km <= kmValue) &&
      (!priceValue || car.price <= priceValue)
    );
  });

  const uniqueFilterOptions = {
    brand: Array.from(new Set(cars.map((car) => car.brand))),
    model: Array.from(new Set(filterCars.map((car) => car.model))),
    color: Array.from(new Set(filterCars.map((car) => car.color))),
    year: Array.from(new Set(filterCars.map((car) => car.year))),
    gasoline: Array.from(new Set(filterCars.map((car) => car.gasoline))),
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      brand: null,
      model: null,
      color: null,
      year: null,
      gasoline: null,
    });
    setKmValue(0);
    setPriceValue(0);
  };

  const handleKmSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKmValue(parseInt(e.target.value));
  };

  const handlePriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(parseInt(e.target.value));
  };

  return (
    <main className={styles.body}>
      <NavBar dealer logged />
      <div className={styles.bg_img}></div>
      <section className={styles.car_shop}>
        <div>
          <ul>
            {Object.entries(uniqueFilterOptions).map(
              ([filterType, options]) => (
                <li key={filterType}>
                  <h3>{filterType}</h3>
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className={
                        (
                          selectedFilters as unknown as Record<
                            string,
                            string | number | null
                          >
                        )[filterType] === option
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        handleFilterChange(
                          filterType as keyof FilterOptions,
                          option
                        )
                      }
                    >
                      {option}
                    </button>
                  ))}
                </li>
              )
            )}
          </ul>
        </div>

        <div className={styles.sliderContainer}>
          <h3>Kilometragem</h3>
          <input
            type="range"
            min={0}
            max={650000}
            step={1000}
            value={kmValue}
            onChange={handleKmSliderChange}
            className={styles.slider}
          />
          <div
            className={styles.sliderCircle}
            style={{ left: `${(kmValue / 650000) * 100}%` }}
          ></div>
        </div>

        <div className={styles.sliderContainer}>
          <h3>Preço</h3>
          <input
            type="range"
            min={0}
            max={550000}
            step={1000}
            value={priceValue}
            onChange={handlePriceSliderChange}
            className={styles.slider}
          />
          <div
            className={styles.sliderCircle}
            style={{ left: `${(priceValue / 550000) * 100}%` }}
          ></div>
        </div>

        <button onClick={handleClearFilters}>Limpar Filtros</button>

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

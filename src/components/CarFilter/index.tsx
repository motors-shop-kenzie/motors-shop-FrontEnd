import { ChangeEvent, useState } from "react";
import { CarFilterProps, FilterOptions } from "./interface";

export default function ({ cars, onFilterChange }: CarFilterProps) {
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
    onFilterChange(newFilters);
  };

  return (
    <div>
      <div>
        <h3>Marca</h3>
        <select
          value={selectedFilters.brand || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange(
              "brand",
              e.target.value !== "" ? e.target.value : null
            )
          }
        >
          <option value="">Todos</option>
          <option value="General Motors">General Motors</option>
          <option value="Fiat">Fiat</option>
          <option value="Ford">Ford</option>
          <option value="Honda">Honda</option>
          <option value="Porsche">Porsche</option>
          <option value="Volswagen">Volswagen</option>
        </select>
      </div>
      <div>
        <h3>Modelo</h3>
        <select
          value={selectedFilters.model || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange(
              "model",
              e.target.value !== "" ? e.target.value : null
            )
          }
        >
          <option value="">Todos</option>
          <option value="Civic">Civic</option>
          <option value="Corolla">Corolla</option>
          <option value="Cruze">Cruze</option>
          <option value="Fit">Fit</option>
          <option value="Gol">Gol</option>
          <option value="Ka">Ka</option>
          <option value="Onix">Onix</option>
          <option value="Porsche 718">Porsche 718</option>
        </select>
      </div>
      <div>
        <h3>Cores</h3>
        <select
          value={selectedFilters.color || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange(
              "color",
              e.target.value !== "" ? e.target.value : null
            )
          }
        >
          <option value="">Todas</option>
          <option value="Azul">Azul</option>
          <option value="Branca">Branca</option>
          <option value="Cinza">Cinza</option>
          <option value="Prata">Prata</option>
          <option value="Preta">Preta</option>
          <option value="Verde">Verde</option>
        </select>
      </div>
      <div>
        <h3>Ano</h3>
        <select
          value={selectedFilters.year || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange(
              "year",
              e.target.value !== "" ? parseInt(e.target.value) : null
            )
          }
        >
          <option value="">Todos</option>
          <option value={2022}>2022</option>
          <option value={2021}>2021</option>
          <option value={2018}>2018</option>
          <option value={2015}>2015</option>
          <option value={2013}>2013</option>
          <option value={2012}>2012</option>
          <option value={2010}>2010</option>
        </select>
      </div>
      <div>
        <h3>Combustível</h3>
        <select
          value={selectedFilters.gasoline || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange(
              "gasoline",
              e.target.value !== "" ? e.target.value : null
            )
          }
        >
          <option value="">Todos</option>
          <option value="Elétrico">Elétrico</option>
          <option value="Flex">Flex</option>
          <option value="Híbrido">Híbrido</option>
        </select>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { FilterOptions } from "./interface";

// export default function CarFilter() {
//   const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
//     brand: null,
//     model: null,
//     color: null,
//     year: null,
//     gasoline: null,
//   });

//   const [filterActive, setFilterActive] = useState<boolean>(false);

//   const handleFilterChange = (
//     filterType: keyof FilterOptions,
//     value: string | number | null
//   ) => {
//     if (filterActive && selectedFilters[filterType] === value) {
//       setFilterActive(false);
//       setSelectedFilters((prevFilters) => ({
//         ...prevFilters,
//         [filterType]: null,
//       }));
//     } else {
//       setFilterActive(true);
//       setSelectedFilters((prevFilters) => ({
//         ...prevFilters,
//         [filterType]: value,
//       }));
//     }
//   };

//   const renderFilterList = (
//     filterType: keyof FilterOptions,
//     options: (string | number)[]
//   ) => (
//     <div key={filterType}>
//       <h3>{filterType}</h3>
//       <ul>
//         <li>
//           <button
//             className={
//               selectedFilters[filterType] === null && !filterActive
//                 ? "selected"
//                 : ""
//             }
//             onClick={() => handleFilterChange(filterType, null)}
//           >
//             Todos
//           </button>
//         </li>
//         {options.map((option, index) => (
//           <li key={index}>
//             <button
//               className={
//                 selectedFilters[filterType] === option && filterActive
//                   ? "selected"
//                   : ""
//               }
//               onClick={() => handleFilterChange(filterType, option)}
//             >
//               {option}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <div>
//       {renderFilterList("brand", brandOptions)}
//       {renderFilterList("model", modelOptions)}
//       {renderFilterList("color", colorOptions)}
//       {renderFilterList("year", yearOptions)}
//       {renderFilterList("gasoline", gasolineOptions)}
//     </div>
//   );
// }

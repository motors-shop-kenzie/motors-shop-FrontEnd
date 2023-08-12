import { FiltersContext } from "@/contexts/FiltersCar/filterContext";
import { useContext } from "react";

export const useFilter = () => {
  const filterHome = useContext(FiltersContext);

  return filterHome;
};

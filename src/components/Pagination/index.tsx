import { TPaginationValue } from "@/contexts/Cars/interface";
import styles from "./styles.module.scss";
import { SetStateAction } from "react";

interface IPaginationProps {
  pageValues: TPaginationValue;
  setPage: (value: SetStateAction<number>) => void;
  page: number;
}

const Pagination = ({ pageValues, setPage, page }: IPaginationProps) => {
  return (
    <div className={styles.container}>
      {pageValues.prev && <button onClick={() => setPage(page - 1)}> &lt; Anterior</button>}
      <p>
        {pageValues.currentPage}&nbsp; <span>de {pageValues.lastPage}</span>
      </p>
      {pageValues.next && <button onClick={() => setPage(page + 1)}>Seguinte &gt;</button>}
    </div>
  );
};

export default Pagination;

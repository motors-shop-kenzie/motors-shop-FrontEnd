import styles from "./styles.module.scss";

export const Select = () => {
  return (
    <select name="Selecione um opção" id="" className={styles.select}>
      <option disabled>Select an option</option>
      <option value="">Opção 1</option>
      <option value="">Opção 2</option>
      <option value="">Opção 3</option>
      <option value="">Opção 4</option>
    </select>
  );
};

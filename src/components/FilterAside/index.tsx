import styles from "./styles.module.scss";

interface IFilterProps {
  title: string;
  list: string[];
}

const Filter = ({ title, list }: IFilterProps) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <ul>
        {list.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Filter;

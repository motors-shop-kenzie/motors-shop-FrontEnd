import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./styles.module.scss";

interface ISelectProps {
  name: string;
  id: string;
  children: React.ReactNode;
  register?: UseFormRegisterReturn<string>;
  value?: string | number | readonly string[];
  setBrand?: Dispatch<SetStateAction<string>>;
}

export const Select = ({ name, id, register, children, setBrand, value }: ISelectProps) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (setBrand) setBrand(value);
  };
  return (
    <select value={value} name={name} id={id} className={styles.select} {...register} onChange={handleSelectChange}>
      {children}
    </select>
  );
};

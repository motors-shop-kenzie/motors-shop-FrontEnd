import { UseFormRegisterReturn } from "react-hook-form";
import {  Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";

interface iSelectProps {
  name: string;
  id: string;
  children: React.ReactNode;
  register?: UseFormRegisterReturn<string>;
  value?: string;
  setBrand?: Dispatch<SetStateAction<string>> | undefined; 
}

export const Select = ({ name, id, register, children, setBrand }: iSelectProps | any) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
  
    setBrand(value);
  };
  return (
    <select name={name} id={id} className={styles.select} {...register} onChange={handleSelectChange}>
      {children}s
    </select>
  );
};

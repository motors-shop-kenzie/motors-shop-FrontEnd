import { iChildrenProps } from "@/interfaces";
import styles from "./styles.module.scss";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import {  Dispatch, SetStateAction, useState } from "react";

interface iSelectProps {
  name: string;
  id: string;
  children: React.ReactNode;
  register?: UseFormRegisterReturn<string>;
  value?: string;
  setBrand?: Dispatch<SetStateAction<string>> | undefined;
}

export const Select = ({ name, id, register,  children, setBrand }: iSelectProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setBrand(value);
  };
  return (
    <select name={name} id={id} className={styles.select} {...register} onChange={handleSelectChange}>
      {children}s
    </select>
  );
};

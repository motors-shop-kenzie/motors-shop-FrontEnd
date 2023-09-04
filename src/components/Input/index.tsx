import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  id: string;
  className: string;
  disabled?: boolean;
  onChangeFn?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string | any;
  register?: UseFormRegisterReturn<string>;
  type: string;
  value?: any;
}

export const Input = ({
  type,
  placeholder,
  className,
  id,
  register,
  value,
  onChangeFn,
  disabled = false,
}: IInputProps) => {
  return (
    <input
      {...register}
      className={className}
      disabled={disabled}
      id={id}
      onChange={onChangeFn}
      placeholder={placeholder}
      type={type}
      defaultValue={value}
    />
  );
};

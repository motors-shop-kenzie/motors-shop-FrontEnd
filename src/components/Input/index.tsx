import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  type: string;
  placeholder: string;
  className: string;
  id: string;
  register?: UseFormRegisterReturn<string>;
  value?: any;
  disabled?: boolean;
}

export const Input = ({ type, placeholder, className, id, register, value, disabled = false }: IInputProps) => {
  return (
    <input
      {...register}
      className={className}
      disabled={disabled}
      id={id}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

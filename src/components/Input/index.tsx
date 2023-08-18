import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  type: string;
  placeholder: string;
  className: string;
  id: string;
  register?: UseFormRegisterReturn<string>;
  value?:any
}

export const Input = ({
  type,
  placeholder,
  className,
  id,
  register,
  value
}: IInputProps) => {
  return (
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className={className}
      id={id}
      value={value}
    />
  );
};

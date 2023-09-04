import { UseFormRegisterReturn } from "react-hook-form";
import { Value } from "sass";

interface iTextAreaProps {
  className: string;
  placeholder: string;
  id: string;
  register?: UseFormRegisterReturn<string>;
  value?: any;
}

export const TextArea = ({ className, placeholder, id, value, register }: iTextAreaProps) => {
  return (
    <textarea
      name=""
      id={id}
      defaultValue={value}
      placeholder={placeholder}
      className={className}
      {...register}
    ></textarea>
  );
};

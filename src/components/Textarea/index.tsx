import { UseFormRegisterReturn } from "react-hook-form";

interface iTextAreaProps {
  className: string;
  placeholder: string;
  id: string;
  register?: UseFormRegisterReturn<string>;
}

export const TextArea = ({
  className,
  placeholder,
  id,
  register,
}: iTextAreaProps) => {
  return (
    <textarea
      name=""
      id={id}
      placeholder={placeholder}
      className={className}
      {...register}
    ></textarea>
  );
};

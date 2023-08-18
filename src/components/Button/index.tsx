
interface iButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  className: string;
  onClick?: () => void;
}

export const Button = ({ text, className, onClick, type }: iButtonProps) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

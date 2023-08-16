import styles from "./styles.module.scss";

interface iButtonProps {
  type?: string;
  text: string;
  className: string;
  onClick?: () => void;
}

export const Button = ({ text, className, onClick }: iButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

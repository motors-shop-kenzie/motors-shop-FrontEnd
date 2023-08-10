import styles from "./styles.module.scss";

interface iButtonProps {
    text: string;
    className: string;
}

export const Button = ({ text, className }: iButtonProps) => {
    return <button className={className}>{text}</button>;
};



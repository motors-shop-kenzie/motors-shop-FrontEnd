interface iInputProps {
    type: string;
    placeholder: string;
    className: string;
    id: string;
}

const Input = ({ type, placeholder, className, id }: iInputProps) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                className={className}
                id={id}
            />
        </>
    );
};

export { Input };

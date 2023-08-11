interface iTextAreaProps {
    className: string;
    placeholder: string;
    id: string;
}

export const TextArea = ({ className, placeholder, id }: iTextAreaProps) => {
    return (
        <textarea
            name=""
            id={id}
            placeholder={placeholder}
            className={className}
        ></textarea>
    );
};



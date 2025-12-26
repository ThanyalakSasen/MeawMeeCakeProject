import Button from "react-bootstrap/Button";

interface ButtonProps {
    textButton?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
}

export const ButtonSubmit = ({ textButton, type, onClick, style }: ButtonProps) => {
    return (
        <>
            <Button type={type} style={style} onClick={onClick}>
                {textButton}
            </Button>
        </>
    );
};

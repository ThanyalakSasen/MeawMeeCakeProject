import Form from "react-bootstrap/Form";

interface InputDateProps {
    label?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export const InputDate = ({
    label,
    name = "date",
    value,
    onChange,
    required = false,
    className,
}: InputDateProps) => {
    return (
        <div style={{ width: "100%" }} className={className}>
            <Form style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                    {label && <Form.Label>{label}</Form.Label>}
                    <Form.Control
                        type="date"
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

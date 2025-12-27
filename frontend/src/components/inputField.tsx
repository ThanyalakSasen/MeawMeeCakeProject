import Form from "react-bootstrap/Form";
interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    maxLength?:number;
    pattern?:string;
    required?: boolean;
}

export const InputField = (props: InputProps) => {
    const { label, placeholder, type, value, onChange, required,maxLength,pattern } = props;
    return (
        <Form style={{width:"100%"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{label}</Form.Label>
                <Form.Control 
                    type={type} 
                    placeholder={placeholder}
                    value={value}
                    maxLength={maxLength}
                    onChange={onChange}
                    required={required}
                    pattern={pattern}
                />
            </Form.Group>
        </Form>
    );
};

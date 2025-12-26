import Form from "react-bootstrap/Form";
interface CheckboxProps {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: boolean;
    required?: boolean;
}

export const InputCheckbox = (props: CheckboxProps) => {
    const { label, value, onChange, required } = props;
    return (
      <Form style={{width:"100%"}}>
          <Form.Check
            type="checkbox"
            id={value || 'default-checkbox'}
            label={label || 'default checkbox'}
            value={value}
            onChange={onChange}
            required={required}
          />
      </Form>
    );
};

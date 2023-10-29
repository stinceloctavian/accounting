import TextField from '@mui/material/TextField';

interface InputFieldProps {
  data: {
    type: string;
    name: string;
    value: string;
    id: string;
    label: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ data, handleChange }: InputFieldProps) => {
  return (
    <TextField
      {...data}
      onChange={handleChange}
      required
      fullWidth
      margin='normal'
    />
  );
};

export default InputField;

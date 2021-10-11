import { useField } from "formik";
import styled from "styled-components";

const Control = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  color: #000;
  display: block;
  margin-bottom: 5px;
`;
const CustomInput = styled.input`
  outline: none;
  padding: 8px;
  border-radius: 4px;
  border: solid 1px #b1b3b5;
  width: 100%;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  color: #f00;
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Control>
      <Label>{label}</Label>
      <CustomInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Control>
  );
};

export default Input;

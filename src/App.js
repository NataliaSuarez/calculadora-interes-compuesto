import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./index.css";

import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Title from "./components/Title";
import Balance from "./components/Balance";

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }
  return Math.round(total);
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const App = () => {
  const [balance, setBalance] = useState("");

  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    setBalance(formatter.format(val));
  };

  return (
    <Container>
      <Section>
        <Title>Calculadora de interes compuesto</Title>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            years: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required("* Obligatorio")
              .typeError("Debe ser un número"),
            contribution: Yup.number()
              .required("* Obligatorio")
              .typeError("Debe ser un número"),
            years: Yup.number()
              .required("* Obligatorio")
              .typeError("Debe ser un número"),
            rate: Yup.number()
              .required("* Obligatorio")
              .typeError("Debe ser un número")
              .min(0, "El valor mínimo es 0")
              .max(1, "El valor máximo es 1"),
          })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial" />
            <Input name="contribution" label="Contribución" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés" />
            <Button type="button">Calcular</Button>
          </Form>
        </Formik>
        {balance !== "" ? (
          <Balance>Balance final {balance}</Balance>
        ) : (
          <div style={{ height: "30px", marginTop: "12px" }} />
        )}
      </Section>
    </Container>
  );
};

export default App;

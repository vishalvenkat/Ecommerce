import { Button, Form } from "react-bootstrap";
import FormContainer from "../Components/FormContainer.tsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savePaymentMethod } from "../slices/cartSlice.js";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeholder");
  };
  return (
    <FormContainer>
      <h1>Payment</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label>Select Method</Form.Label>
          <Form.Check
            type="radio"
            className="my-2"
            label="Paypal"
            name="paypal"
            id="paypal"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;

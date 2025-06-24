import { Button, Form } from "react-bootstrap";
import FormContainer from "../Components/FormContainer.tsx";
import { useState } from "react";
import CustomFormGroup from "../Components/CustomFormGroup.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice.js";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state: any) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [pinCode, setPinCode] = useState(shippingAddress?.pinCode || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const shippingAddress = {
      address,
      pinCode,
      city,
      country,
    };
    dispatch(saveShippingAddress(shippingAddress));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={onSubmitHandler}>
        <CustomFormGroup
          label="Address"
          name="address"
          value={address}
          placeholder="Enter Address"
          onChangeHandler={(e) => setAddress(e.target.value)}
        />
        <CustomFormGroup
          label="Pin code"
          name="pinCode"
          value={pinCode}
          placeholder="Enter pin code"
          onChangeHandler={(e) => setPinCode(e.target.value)}
        />
        <CustomFormGroup
          label="City"
          name="city"
          value={city}
          placeholder="Enter city"
          onChangeHandler={(e) => setCity(e.target.value)}
        />
        <CustomFormGroup
          label="County"
          name="country"
          value={country}
          placeholder="Enter country"
          onChangeHandler={(e) => setCountry(e.target.value)}
        />
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;

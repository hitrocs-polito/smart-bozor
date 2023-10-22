import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import LocationPicker from "./MapScreen";
import LocationDetails from "../components/locationDetails";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelected = (coordinates) => {
    setSelectedLocation(coordinates);
  };

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [region, setRegion] = useState(shippingAddress.region);
  const [district, setDistrict] = useState(shippingAddress.district);
  const [street, setStreet] = useState(shippingAddress.street);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ region, district, street, phoneNumber }));
    navigate("/payment");
  };

  return (
    <Row>
      <CheckoutSteps step1 step2 />
      <Col md={7}>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <h1>Yetkazib berish</h1>
            <Form.Group className="mb-3" controlId="region">
              <Form.Label>Viloyat</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Viloyatingizni kiriting"
                value={region ? region : ""}
                onChange={(e) => setRegion(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="district">
              <Form.Label>Tuman</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Tumaningizni kiriting"
                value={district ? district : ""}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="street">
              <Form.Label>Mahalla nomi va manzili</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Ko'changizni kiriting"
                value={street ? street : ""}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefon raqam</Form.Label>
              <Form.Control
                required
                type="phone"
                placeholder="Telefon raqamingizni kiriting"
                value={phoneNumber ? phoneNumber : ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Davom etish
            </Button>
          </Form>
          <p style={{ marginTop: "1.4rem", color: "red" }}>
            ! Aniq manzilingizni bilmasangiz, xaritadan toping va manzilni
            kiriting!
          </p>
        </FormContainer>
      </Col>

      <Col>
        <h1>Xaritadan izlash</h1>

        <LocationPicker onLocationSelected={handleLocationSelected} />

        {selectedLocation && (
          <div>
            <span style={{ fontSize: "1.4rem" }}>Belgilangan manzil:</span>
            <LocationDetails
              latitude={selectedLocation[0]}
              longitude={selectedLocation[1]}
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

export default ShippingScreen;

import React from "react";
import { Button, Form } from "react-bootstrap";

function QuantityInput({ value, onChange, min, max }) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="quantity-input">
      <Button
        onClick={handleDecrease}
        variant="secondary"
        size="sm"
        className="qty-button"
      >
        <span>➖</span>
      </Button>
      <Form.Control
        readOnly
        type="text"
        value={value}
        size="sm"
        onChange={(e) => onChange(e.target.value)}
        className="qty-input-form"
      />
      <Button
        onClick={handleIncrease}
        variant="secondary"
        size="sm"
        className="qty-button"
      >
        <span>➕</span>
      </Button>
    </div>
  );
}

export default QuantityInput;

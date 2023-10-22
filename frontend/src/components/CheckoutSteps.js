import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <NavItem>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Kirish</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Kirish</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Yetkazib berish</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Yetkazib berish</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>To'lov</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>To'lov</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Yakunlash</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Yakunlash</Nav.Link>
        )}
      </NavItem>
    </Nav>
  );
}

export default CheckoutSteps;

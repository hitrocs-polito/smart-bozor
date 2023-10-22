import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="product-rating">
          <Rating
            value={product.rating}
            text={`${product.numReviews} baholar`}
            color={"#f8e825"}
          />
        </Card.Text>

        <Card.Text as="div" className="product-price">
          {Math.round(product.price).toLocaleString("en-US").replace(/,/g, " ")}{" "}
          so'm
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;

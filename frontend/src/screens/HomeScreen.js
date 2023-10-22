import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  const location = useLocation();

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h2>mahsulotlar</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row className="product-screen">
          {products.map((product) => (
            <Col key={product._id} sm={7} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Link, useParams, useNavigate } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const { id } = useParams(); // Use useParams to get the id parameter
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id)); // Use the id from useParams
  }, [dispatch, id]); // Add id to the dependency array

  const addToCardHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <Link to={"/"} className="btn btn-light my-2">
        Ortga
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>

              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={` ${product.numReviews} baholar`}
                  color={"#f8e821"}
                />
              </ListGroupItem>

              <ListGroupItem>
                <span style={{ fontWeight: "bold" }}>Narxi:</span>{" "}
                {Math.round(product.price)
                  .toLocaleString("en-US")
                  .replace(/,/g, " ")}{" "}
                so'm
              </ListGroupItem>

              <ListGroupItem>
                <span style={{ fontWeight: "bold" }}>
                  Mahsulot haqida qisqacha:
                </span>
                <br />
                {product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            {/* {showAlert && (
              <Alert
                variant="success"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                Mahsulot savatingizga qo'shildi!
              </Alert>
            )} */}
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Narxi:</Col>
                    <Col>
                      <strong>
                        {Math.round(product.price)
                          .toLocaleString("en-US")
                          .replace(/,/g, " ")}{" "}
                        so'm
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Holati:</Col>
                    <Col>
                      {product.countInStock > 0 ? "Mavjud" : "Sotuvda yoq"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Miqdori:</Col>
                      <Col xs="auto" className="my-0">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item style={{ margin: "auto" }}>
                  <Button
                    onClick={addToCardHandler}
                    className="btn-block"
                    disabled={product.countInStock === 0}
                    type="button"
                  >
                    Savatga qo'shish
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;

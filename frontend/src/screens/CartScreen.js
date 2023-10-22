import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import QuantityInput from "../components/QuantityInput";

function CartScreen() {
  const { id } = useParams();
  const location = useLocation(); // Use the useLocation hook to get the location object
  const navigate = useNavigate();
  const qty = location.search
    ? Number(new URLSearchParams(location.search).get("qty"))
    : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/shipping");
    }
  };

  return (
    <Row style={{ borderRadius: "3px" }}>
      <div style={{ display: "block" }}>
        <Link to={"/"} className="btn btn-light my-2">
          Ortga
        </Link>
      </div>
      <h1>Xaridlar savati</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant="info">Savatda hozircha mahsulot yo'q!</Message>
        ) : (
          <ListGroup variant="flush" className="cart-items">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="cart-items-card">
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      className="product-image-image"
                    ></Image>
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    {Math.round(item.price)
                      .toLocaleString("en-US")
                      .replace(/,/g, " ")}{" "}
                    so'm
                  </Col>

                  <Col md={3}>
                    <QuantityInput
                      value={item.qty}
                      onChange={(newQty) =>
                        dispatch(addToCart(item.product, newQty))
                      }
                      min={1}
                      max={item.countInStock}
                    />
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card className="cart-summary-card">
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  display: "block",
                  color: "#11999E",
                }}
              >
                <strong>Buyurtmangiz</strong>
              </span>
              <br></br>
              <span
                style={{
                  fontWeight: "bolder",
                  fontSize: "1.2rem",
                  display: "block",
                }}
              >
                Savatdagi mahsulotlar soni:{" "}
                <strong>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </strong>
              </span>
              <span
                style={{
                  fontWeight: "bolder",
                  fontSize: "1.4rem",
                  display: "block",
                }}
              >
                Jami miqdor:
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                  display: "block",
                }}
              >
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toLocaleString("en-US")
                  .replace(/,/g, " ")}{" "}
                so'm
              </span>
            </ListGroup.Item>

            <ListGroup.Item style={{ margin: ".4rem auto" }}>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0 ? true : false}
                onClick={checkOutHandler}
              >
                Buyurtmani rasmiylashtirish
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#efefef",
        padding: "20px 0 0",
        marginTop: "50px",
      }}
    >
      <Container>
        <Row className="footer-contact">
          <Col xs={12} md={4}>
            <h5>Ijtimoiy tarmoqlar</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://github.com/hitrocs-polito"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icons"
                >
                  <FaGithub /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/hitrocs"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icons"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/hitrocs"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icons"
                >
                  <FaTelegram /> Telegram
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>Bog'lanish</h5>
            <p className="mail-contact">
              <a className="social-icons" href="tel:+998944336611">
                +998 (94) 433-66-11
              </a>
            </p>
            <p className="mail-contact">
              <a className="social-icons" href="mailto:muminov0820@gmail.com">
                muminov0820@gmail.com
              </a>
            </p>
          </Col>

          <Col xs={12} md={2}>
            <h5>Portfolio</h5>
            <p className="mail-contact">
              <a
                className="social-icons"
                target="_blank"
                rel="noreferrer"
                href="https://hitrocs.uz"
              >
                hitrocs.uz
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

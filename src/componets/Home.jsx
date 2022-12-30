import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthService from "../services/AuthService";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LoremIpsum } from "react-lorem-ipsum";
import Logo from "../assets/img/logo192.png";
import "./Sign.css";
const Home = () => {
  if (AuthService.getCurrentUser() == null) {
    return <Navigate to="/sign-in" />;
  }

  const currentUser = AuthService.getCurrentUser();

  const url = `https://randomuser.me/api/portraits/thumb/men/${currentUser.UserProfile}.jpg`;
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              style={{ width: "35px", height: "35px" }}
              src={Logo}
              alt="Logo"
            ></img>
            <b> React User Panel</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown
                title={currentUser.UserFullName}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={AuthService.logout}
                  href="#action/3.1"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Card
        className="text-center mt-3 shadow"
        style={{
          align: "center",
          margin: "auto",
          width: "70%",
          padding: "10px",
        }}
      >
        <Card.Header>
          <b>{currentUser.UserFullName}</b>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Card.Img
              style={{ width: "100px", height: "100px" }}
              variant="top"
              src={url}
            />
          </Card.Title>
          <Card.Text>
            <LoremIpsum p={2} />
          </Card.Text>
          `
          <Button
            href={"mailto:" + currentUser.UserEmail}
            variant="secondary"
            size="sm"
          >
            {currentUser.UserEmail}
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <b>{currentUser.DOJ.substring(0, 10)}</b>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Home;

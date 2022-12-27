import axios from "axios";
import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../../App";

function Header() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(UserContext);

  function showData() {}

  const handleLogout = async () => {
    console.dir(authUser);
    setAuthUser(null);
    await axios.post(
      "http://127.0.0.1:8005/api/auth/logout",
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${new Cookies().get("Authorization")}`,
        },
      }
    );

    // navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Test Pengguna</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {authUser ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="fathie">
                  <NavDropdown.Item onClick={showData}> Daftar Users</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}> Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">
                  Login <BsBoxArrowLeft />{" "}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;

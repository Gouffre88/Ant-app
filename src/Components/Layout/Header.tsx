import React, { useState } from 'react';
import { Navbar, Container, Nav, } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';

import { userModel } from '../../Interfaces';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../Storage/Redux/store";
import userInterface from '../../Interfaces/userInterface';
import { useNavigate } from 'react-router-dom';
import { emptyUserState, setLoggedInUser } from '../../Storage/Redux/userAuthSlice';

let logo = require("../../Assets/Images/logo.png");

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<userInterface | null>(null);

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Nav.Link className="App-link" aria-current="page" href="/">
            <img src={logo} style={{ height: '40px' }} className="m-1" />
          </Nav.Link>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="App-link" href="/clicker">Контекст</Nav.Link>
              <Nav.Link className="App-link" href="/hooks">Хуки обычные</Nav.Link>
              <Nav.Link className="App-link" href="/mui">MUI</Nav.Link>
              <Nav.Link className="App-link" href="/callback">useCallback</Nav.Link>
              <Nav.Link className="App-link" href="/custom">Custom hooks</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              {userData.id && (
                <NavDropdown title={`Signed in as: ${userData.fullName}`} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
               {!userData.id && (
                <>
                  <Nav.Link className="App-link" href="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="App-link" href="/register">
                    Register
                  </Nav.Link>
                </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
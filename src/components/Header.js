import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap'

class Header extends Component {

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>Alexandria</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="justify-content-end" style={{width: "100%"}}>
            <Nav.Item className="mx-1 align-middle">
              Hello
            </Nav.Item>

            <Nav.Item>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => console.log("#/action-1")}>Action</Dropdown.Item>
                  <Dropdown.Item onClick={() => console.log("#/action-2")}>Another action</Dropdown.Item>
                  <Dropdown.Item onClick={() => console.log("#/action-3")}>Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default Header;

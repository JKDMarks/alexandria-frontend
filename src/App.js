import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, Dropdown } from 'react-bootstrap'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light">
          <Navbar.Brand>Alexandria</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="justify-content-end" style={{width: "100%"}}>
              <Nav.Item>
                Hello
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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

      </div>
    )
  }
}

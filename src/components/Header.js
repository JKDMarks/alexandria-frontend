import React, { Component } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap'
import { Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class Header extends Component {
  logout = () => {
    this.props.logoutUser()
    localStorage.removeItem("token")
    this.props.history.push("/login")
  }

  render() {
    // console.log("Header props", this.props)

    const legalFormats = {
      standard: "Standard",
      modern: "Modern",
      legacy: "Legacy",
      vintage: "Vintage",
      pauper: "Pauper",
      commander: "Commander/EDH",
      penny: "Penny Dreadful"
    }

    return (
      <Navbar bg="light">
        <Navbar.Brand
          style={{
            color: "midnightblue",
            textShadow: "1px 1px cornflowerblue",
            font: "30px Beleren"
          }}
          onClick={() => this.props.history.push("/")}
        >
          Alexandria
        </Navbar.Brand>

        <Nav className="justify-content-end" style={{width: "100%"}}>
          <Button className="mr-2" variant="info" onClick={() => this.props.history.push("/new")}>
            <Icon fitted className="pr-1" name="plus circle" />
            New Deck
          </Button>

          <Dropdown className="mr-2">
            <Dropdown.Toggle style={{alignItems: "center", display: "flex"}} variant="secondary">
              Decks by Format
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              {
                Object.keys(legalFormats).map(format => (
                  <Dropdown.Item onClick={() => this.props.history.push(`/decks/format/${format}`)}>{legalFormats[format]}</Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle style={{alignItems: "center", display: "flex"}} variant="secondary">
              {this.props.user.username}
              &nbsp;
              <img src={this.props.user.image} alt="propic" height="25px" width="25px"/>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              <Dropdown.Item onClick={() => this.props.history.push(`/users/${this.props.user.id}`)}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.history.push(`/decks/my-decks`)}>My Decks</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item className="text-center">
                <Button variant="danger" onClick={this.logout}>Logout</Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }

}

export default withAuth(Header)

import React, { Component } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUser, logoutUser } from '../actions/userActions'
import withAuth from '../hocs/withAuth'

class Header extends Component {
  logout = () => {
    this.props.logoutUser()
    localStorage.removeItem("token")
    this.props.history.push("/login")
  }

  // componentDidMount() {
  //   this.props.fetchUser()
  //   // console.log(this.props.location.pathname)
  // }

  render() {
    // console.log("Header props", this.props)
    return (
      <Navbar bg="light">
        <Navbar.Brand>Alexandria</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="justify-content-end" style={{width: "100%"}}>
            <Nav.Item>
              <Dropdown>
                <Dropdown.Toggle style={{alignItems: "center", display: "flex"}} variant="secondary">
                  {this.props.user.username}
                  &nbsp;
                  <img src={this.props.user.image} alt="propic" height="25px" width="25px"/>
                </Dropdown.Toggle>

                <Dropdown.Menu alignRight>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>My Decks</Dropdown.Item>
                  <Dropdown.Item>New Deck</Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item className="text-center">
                    <Button variant="danger" onClick={this.logout}>Logout</Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

// export default connect(({ user }) => ({ user }), ({ fetchUser, logoutUser }))(withRouter(Header))
export default withAuth(Header)

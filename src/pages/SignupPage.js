import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signupUser } from '../actions/userActions'
import { Form, Button } from 'semantic-ui-react'

class SignupPage extends Component {

  state = { username: "", password: "", passwordConfirm: "" }

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    this.props.signupUser(this.state)
    this.setState({ username: "", password: "", passwordConfirm: "" })
  }

  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <div className="h-100 row align-items-center">
        <div className="col-8 offset-2">
          <div className="card p-2">
            <Form onSubmit={this.handleSubmit}>
              <p style={{textAlign: "center"}}><u><b>Signup</b></u></p>
              <Form.Input
                name="username"
                icon="user"
                iconPosition="left"
                label="Username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Input
                name="password"
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Form.Input
                name="passwordConfirm"
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Confirm Password"
                type="password"
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
              />
              <Button type="submit">Signup</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(({loggedIn}) => ({loggedIn}), ({ signupUser }))(SignupPage)

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Form, Button, Divider } from 'semantic-ui-react'

import { loginUser } from '../actions/userActions'

class LoginPage extends Component {

  state = { username: "", password: "" }

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    this.props.loginUser(this.state)
    this.setState({ username: "", password: "" })
  }

  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push("/")
    }
  }

  render() {
    // console.log("LoginPage state", this.state)
    // console.log("LoginPage props", this.props)
    return (
      <div className="h-100 row align-items-center">
        <div className="col-8 offset-2">
          <div className="card p-2">
            <Grid columns={2}>
              <Grid.Column>
                <Form onSubmit={this.handleSubmit}>
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
                  <Button type="submit">Login</Button>
                </Form>
              </Grid.Column>

              <Grid.Column verticalAlign="middle" textAlign="center">
                <Button
                  content='Sign up'
                  icon='signup'
                  size='big'
                  onClick={() => this.props.history.push("/signup")}
                />
              </Grid.Column>
            </Grid>
            <Divider vertical>OR</Divider>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(({loggedIn}) => ({loggedIn}), ({ loginUser }))(LoginPage)

import React, { Component, Fragment } from 'react'
import { Segment, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateUser } from '../actions/userActions'
import Header from '../components/Header'

class EditProfilePage extends Component {

  state = {
    id: 0,
    password: "",
    passwordConfirm: "",
    favoriteCardName: "",
    image: "",
    username: ""
  }

  componentDidUpdate() {
    if (!this.state.id) {
      const { favorite_card, id, image, username } = this.props.user
      this.setState({ favoriteCardName: favorite_card.name, image, username, id })
    }
  }

  handleChange = (e, { value }) => this.setState({ [e.target.name]: value })

  handleSubmit = () => this.props.updateUser(this.state, this.props.history)

  render() {
    // console.log("EditProfilePage props", this.props);
    // console.log("EditProfilePage state", this.state);
    return (
      <Fragment>
        <Header/>

        <Segment className="m-3">
          <h4 style={{fontFamily: "Beleren", textAlign: "center"}}>
            Edit Profile
          </h4>

          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              name="username"
              value={this.state.username}
              label="Username"
              onChange={this.handleChange}
            />

            <Form.Input
              name="password"
              type="password"
              value={this.state.password}
              placeholder="Password and..."
              label="Password"
              onChange={this.handleChange}
            />

            <Form.Input
              name="passwordConfirm"
              type="password"
              value={this.state.passwordConfirm}
              placeholder="...confirm password should match"
              label="Confirm Password"
              onChange={this.handleChange}
            />

            <Form.Input
              name="favoriteCardName"
              value={this.state.favoriteCardName}
              placeholder="No favorite card"
              label="Favorite Card Name"
              onChange={this.handleChange}
            />

            <Form.Input
              name="image"
              value={this.state.image}
              label="Profile Picture"
              onChange={this.handleChange}
            />

            <Form.Button>
              Update Profile
            </Form.Button>
          </Form>
        </Segment>
      </Fragment>
    )
  }

}

export default connect(null, ({ updateUser }))(EditProfilePage)

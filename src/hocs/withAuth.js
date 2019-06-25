import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../actions/userActions'

export default function withAuth(WrapThisComponent) {
  class ComponentThatIsWrapped extends Component {
    componentDidMount() {
      if (!localStorage.token || localStorage.token === "undefined") {
        this.props.history.push("/login")
      }
    }

    render() {
      console.log("withAuth props", this.props);
      return (
        <WrapThisComponent
          loggedIn={this.props.loggedIn}
          user={this.props.user}
        />
      )
    }
  }

  return connect(
    ({ user, loggedIn }) => ({ user, loggedIn }),
    ({ fetchUser })
  )(withRouter(ComponentThatIsWrapped))
}

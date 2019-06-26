import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUser, logoutUser } from '../actions/userActions'

export default function withAuth(WrapThisComponent) {
  class ComponentThatIsWrapped extends Component {
    componentDidMount() {
      if (!localStorage.token || localStorage.token === "undefined") {
        this.props.history.push("/login")
      } else {
        this.props.fetchUser()
      }
    }

    render() {
      // console.log("withAuth props", this.props);
      return (
        <WrapThisComponent
          {...this.props}
        />
      )
    }
  }

  return connect(
    ({ user, loggedIn }) => ({ user, loggedIn }),
    ({ fetchUser, logoutUser })
  )(withRouter(ComponentThatIsWrapped))
}

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProfilePage extends Component {

  render() {
    if (this.props.user.id) {
      return <Redirect to={`/users/${this.props.user.id}`}/>
    } else {
      return <div></div>
    }
  }

}

export default ProfilePage

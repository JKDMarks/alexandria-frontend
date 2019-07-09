import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Card, Image } from 'semantic-ui-react'
import Header from '../components/Header.js'
// import { testImage } from '../actions/cardsActions'

class UsersPage extends Component {

  state = { users: [] }

  componentDidMount() {
    fetch("http://localhost:3000/users")
      .then(r => r.json())
      .then(users => this.setState({ users }))
  }

  renderUsers = () => this.state.users.map(user => {
    // testImage(user.image)

    return (
      <Card onClick={() => this.props.history.push(`/users/${user.id}`)}>
        <Image src={user.image}/>
        <Card.Content>
          { user.username }
        </Card.Content>
      </Card>
    )
  })

  render() {
    return (
      <Fragment>
        <Header/>

        <Segment className="m-3 transparent">
          <h4 className="mb-3" style={{fontFamily: "Beleren", textAlign: "center"}}>Users</h4>
          <Card.Group itemsPerRow={6}>
            { this.renderUsers() }
          </Card.Group>
        </Segment>
      </Fragment>
    )
  }

}

export default UsersPage

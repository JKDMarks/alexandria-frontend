import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Grid, Button } from 'semantic-ui-react'
import Header from '../components/Header'
import WUBRGBanner from '../components/WUBRGBanner'

class UserPage extends Component {

  state = {
    userProfile: {}
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.match.params.id}`)
      .then(r => r.json())
      .then(user => {
        if (user.status === 404) {
          this.props.history.push("/")
        } else {
          this.setState({ userProfile: user })
        }
      })
  }

  componentWillReceiveProps(newProps) {
    // debugger
    if (this.props && newProps.match) {
      if (this.props.match.params.id !== newProps.match.params.id) {
        fetch(`http://localhost:3000/users/${newProps.match.params.id}`)
          .then(r => r.json())
          .then(user => this.setState({ userProfile: user }))
      }
    }
  }

  handleEditClick = () => this.props.history.push("/profile/edit")

  render() {
    // console.log("UserPage props", this.props)
    // console.log("UserPage state", this.state)
    return (
      <Fragment>
        <Header/>

        {
          this.state.userProfile.id ? (
            <Segment className="m-5 transparent">
              <WUBRGBanner size="small"/>

              <h4 style={{textAlign: "center", fontFamily: "Beleren"}}>
                {this.state.userProfile.username}

                {
                  this.state.userProfile.id === this.props.user.id ? (
                    <Fragment>
                      &nbsp;
                      <Button size="mini" color="yellow" onClick={this.handleEditClick}>Edit</Button>
                    </Fragment>
                  ) : (null)
                }
              </h4>

              <Grid columns={2}>
                <Grid.Column>
                  <h5>Decks</h5>
                  <ul>
                    {
                      this.state.userProfile.decks.map(deck => (
                        <li key={deck.id}>
                          <Link to={`/decks/${deck.id}`}>
                            {deck.name} ({deck.format.slice(0,1).toUpperCase() + deck.format.slice(1)})
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </Grid.Column>

                <Grid.Column>
                  <h5>Favorite Card</h5>
                  {
                    this.state.userProfile.favorite_card.image_uris ? (
                      <img src={this.state.userProfile.favorite_card.image_uris.large} alt="fav card"/>
                    ) : (
                      <img
                        src="https://img.scryfall.com/cards/large/en/unh/44.jpg?1520015716"
                        alt="Richard Garfield, PhD"
                      />
                    )
                  }
                </Grid.Column>
              </Grid>

              <WUBRGBanner size="small"/>
            </Segment>
          ) : (null)
        }
      </Fragment>
    )
  }

}

export default UserPage

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { favoriteDeck, unfavoriteDeck } from '../actions/userActions'
import { Card, Image, Icon, Button, Grid } from 'semantic-ui-react'
import moment from 'moment'
import WUBRGBanner from '../components/WUBRGBanner'

class DeckCard extends Component {

  favOrUnfav = () => {
    if (this.favInstance()) {
      this.props.unfavoriteDeck(this.props.user.id, this.props.deck.id)
    } else {
      this.props.favoriteDeck(this.props.user.id, this.props.deck.id)
    }
  }

  favInstance = () => {
    if (this.props.user.favorites) {
      return this.props.user.favorites.find(fav => fav.deck_id === this.props.deck.id)
    } else {
      return false
    }
  }

  render() {
    // console.log("DeckCard props", this.props);
    const { deck: {id, name, format, image, user, created_at, colors} } = this.props
    const capitalizeFormat = format.slice(0,1).toUpperCase() + format.slice(1)

    return (
      <Card onClick={this.props.goToDeckPage} className="card-with-deck-id" id={id}>
        <Card.Content textAlign="center">
          <Grid className="p-2" columns={5}>
            <Grid.Column className="p-0 m-0"><img style={{height: "20px", width: "20px", opacity: colors.includes("W") ? 1 : 0.10}} src="/images/W.png" alt="white mana symbol"/></Grid.Column>
            <Grid.Column className="p-0 m-0"><img style={{height: "20px", width: "20px", opacity: colors.includes("U") ? 1 : 0.10}} src="/images/U.png" alt="blue mana symbol"/></Grid.Column>
            <Grid.Column className="p-0 m-0"><img style={{height: "20px", width: "20px", opacity: colors.includes("B") ? 1 : 0.10}} src="/images/B.png" alt="black mana symbol"/></Grid.Column>
            <Grid.Column className="p-0 m-0"><img style={{height: "20px", width: "20px", opacity: colors.includes("R") ? 1 : 0.10}} src="/images/R.png" alt="red mana symbol"/></Grid.Column>
            <Grid.Column className="p-0 m-0"><img style={{height: "20px", width: "20px", opacity: colors.includes("G") ? 1 : 0.10}} src="/images/G.png" alt="green mana symbol"/></Grid.Column>
          </Grid>

          <br/>

          <Card.Header>{name}</Card.Header>
          <hr className="my-0" width="100%"/>
          <Card.Meta>{capitalizeFormat}</Card.Meta>
        </Card.Content>

        <Image src={image}/>

        <Card.Content>
          <Card.Description>
            Created by {user.username}
          </Card.Description>

          <Card.Meta>
            {moment(created_at).format('MMM D YYYY, h:mm a')}
          </Card.Meta>

          <Card.Description textAlign="center">
            <Button className="fav-btn" onClick={this.favOrUnfav}>
              <Icon
                fitted style={{color: "red"}}
                name={this.favInstance() ? "heart" : "heart outline"}
              />
            </Button>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

}

export default connect(({ user }) => ({ user }), ({ favoriteDeck, unfavoriteDeck }))(DeckCard);

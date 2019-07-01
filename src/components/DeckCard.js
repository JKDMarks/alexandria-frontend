import React, { Component } from 'react';
import { connect } from 'react-redux'
import { favoriteDeck, unfavoriteDeck } from '../actions/userActions'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import moment from 'moment'

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
    // console.log("DeckCard favInstance()", this.favInstance());
    const { deck: {id, name, format, image, user, created_at} } = this.props
    const capitalizeFormat = format.slice(0,1).toUpperCase() + format.slice(1)

    return (
      <Card onClick={this.props.goToDeckPage} className="card-with-deck-id" id={id}>
        <Card.Content textAlign="center">
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

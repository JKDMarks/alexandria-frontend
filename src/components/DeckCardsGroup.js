import React, { Component, Fragment } from 'react';
import { Card, Segment, Header } from 'semantic-ui-react'
import DeckCard from './DeckCard'
import BigDeckCard from './BigDeckCard'

class DeckCardsGroup extends Component {


  renderDeckCards = () => {
    return this.props.decks.map(deck => {
      return <DeckCard key={deck.id} deck={deck} handleClick={this.props.showBigDeck}/>
    })
  }

  render() {
    return (
      <Segment className="m-2">
        <Header textAlign="center" size="large">{this.props.header}</Header>
        <Card.Group itemsPerRow={4} className="m-0">
          { this.renderDeckCards() }
        </Card.Group>
      </Segment>
    );
  }

}

export default DeckCardsGroup;

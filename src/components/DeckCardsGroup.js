import React, { Component } from 'react';
import { Card, Segment, Header } from 'semantic-ui-react'
import DeckCard from './DeckCard'

class DeckCardsGroup extends Component {

  renderDeckCards = () => {
    if (this.props.decks) {
      return this.props.decks.map(deck => {
        return <DeckCard key={deck.id} deck={deck} goToDeckPage={this.props.goToDeckPage}/>
      })
    }
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

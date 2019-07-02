import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, Segment, Header } from 'semantic-ui-react'
import DeckCard from './DeckCard'

class DeckCardsGroup extends Component {

  renderDeckCards = () => {
    if (Array.isArray(this.props.decks)) {
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

        <p style={{textAlign: "right"}} >
          <Link to={this.props.link} onClick={() => window.scrollTo(0, 0)}>{this.props.linkText}</Link>
        </p>
      </Segment>
    );
  }

}

export default DeckCardsGroup;

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decksActions'
import { fetchCards } from '../actions/cardsActions'
import DeckCardsGroup from '../components/DeckCardsGroup.js'

class DecksContainer extends Component {

  state = { bigDeck: null }

  showBigDeck = e => {
    if (!e.target.closest(".fav-btn")) {
      console.log(e.target.closest(".card-with-deck-id"))
    }
  }

  favoriteDecks = () => (
    this.props.decks.filter(deck => (
      this.props.user.favorites.slice(0, 4).find(fav => fav.deck_id === deck.id)
    ))
  )

  componentDidMount() {
    this.props.fetchCards()
    this.props.fetchDecks()
  }

  render() {
    console.log("DecksContainers props", this.props)
    return (
      <Fragment>
        <DeckCardsGroup
          header="Newest Decks"
          decks={this.props.decks.slice(-12).sort(() => -1)}
          showBigDeck={this.showBigDeck}
        />
        <DeckCardsGroup
          header="Favorite Decks"
          decks={this.favoriteDecks()}
          showBigDeck={this.showBigDeck}
        />
      </Fragment>
    )
  }

}

export default connect(({ user, decks, cards }) => ({ user, decks, cards }), ({ fetchDecks, fetchCards }))(DecksContainer)

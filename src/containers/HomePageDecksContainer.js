import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchDecks } from '../actions/decksActions'
import DeckCardsGroup from '../components/DeckCardsGroup.js'


class HomePageDecksContainer extends Component {

  goToDeckPage = e => {
    if (!e.target.closest(".fav-btn")) {
      const deckId = e.target.closest(".card-with-deck-id").id
      this.props.history.push(`/decks/${deckId}`)
    }
  }

  twelveNewestDecks = () => {
    return this.props.decks.slice(-12).sort(() => -1)
  }

  favoriteDecks = () => {
    return this.props.decks.filter(deck => {
      if (Array.isArray(this.props.user.favorites)) {
        return this.props.user.favorites.slice(0, 4).find(fav => fav.deck_id === deck.id)
      } else {
        return []
      }
    })
  }

  componentDidMount() {
    this.props.fetchDecks()
  }

  render() {
    // console.log("HomePageDecksContainers props", this.props)
    return (
      <Fragment>
        <DeckCardsGroup
          header="Newest Decks"
          decks={this.twelveNewestDecks()}
          goToDeckPage={this.goToDeckPage}
        />

        <DeckCardsGroup
          header="Favorite Decks"
          decks={this.favoriteDecks()}
          goToDeckPage={this.goToDeckPage}
        />
      </Fragment>
    )
  }

}

export default connect(({ user, decks }) => ({ user, decks }), ({ fetchDecks }))(HomePageDecksContainer)

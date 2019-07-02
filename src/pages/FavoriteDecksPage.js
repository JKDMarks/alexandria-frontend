import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import DeckCardsGroup from '../components/DeckCardsGroup'
import { fetchDecks } from '../actions/decksActions'
import { fetchUser } from '../actions/userActions'

class AllDecksPage extends Component {

  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchDecks()
  }

  goToDeckPage = e => {
    if (!e.target.closest(".fav-btn")) {
      const deckId = e.target.closest(".card-with-deck-id").id
      this.props.history.push(`/decks/${deckId}`)
    }
  }

  render() {
    console.log("FavoriteDecksPage props", this.props);

    let favoriteDecks = []

    if (this.props.user.id && this.props.decks[0]) {
      favoriteDecks =  this.props.decks.filter(deck => (
        this.props.user.favorites.find(fav => fav.deck_id === deck.id)
      ))
    }

    return (
      <Fragment>
        <Header/>

        <DeckCardsGroup
          header="Favorite Decks"
          decks={favoriteDecks}
          goToDeckPage={this.goToDeckPage}
          link={"/"}
          linkText={"Go Home =>"}
        />
      </Fragment>
    )
  }

}

export default connect(
  ({ user, decks }) => ({ user, decks }),
  ({ fetchUser, fetchDecks })
)(AllDecksPage)

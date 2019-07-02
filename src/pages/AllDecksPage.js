import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import DeckCardsGroup from '../components/DeckCardsGroup'
import { fetchDecks } from '../actions/decksActions'

class AllDecksPage extends Component {

  componentDidMount() {
    this.props.fetchDecks()
  }

  goToDeckPage = e => {
    if (!e.target.closest(".fav-btn")) {
      const deckId = e.target.closest(".card-with-deck-id").id
      this.props.history.push(`/decks/${deckId}`)
    }
  }

  render() {
    return (
      <Fragment>
        <Header/>

        <DeckCardsGroup
          header="All Decks"
          decks={this.props.decks}
          goToDeckPage={this.goToDeckPage}
          link={"/"}
          linkText={"Go Home =>"}
        />
      </Fragment>
    )
  }

}

export default connect(
  ({ decks }) => ({ decks }),
  ({ fetchDecks })
)(AllDecksPage)
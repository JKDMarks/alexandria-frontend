import React, { Component, Fragment } from 'react';
import Header from '../components/Header'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decksActions'
import DeckCardsGroup from '../components/DeckCardsGroup.js'

class PageOfDecks extends Component {

  goToDeckPage = e => {
    if (!e.target.closest(".fav-btn")) {
      const deckId = e.target.closest(".card-with-deck-id").id
      this.props.history.push(`/decks/${deckId}`)
    }
  }

  // twelveNewestDecks = () => this.props.decks.slice(-12).sort(() => -1)

  favoriteDecks = () => {
    return this.props.decks.filter(deck => {
      if (Array.isArray(this.props.user.favorites)) {
        return this.props.user.favorites.find(fav => fav.deck_id === deck.id)
      } else {
        return []
      }
    })
  }

  myDecks = () => this.props.decks.filter(deck => deck.user.id === this.props.user.id)

  componentDidMount() {
    this.props.fetchDecks()
  }

  render() {
    console.log("PageOfDecks props", this.props);
    console.log("PageOfDecks state", this.state);
    return (
      <Fragment>
        <Header/>

        {
          this.props.page === "home" ? (
            <Fragment>
              {/* ////////// HOME PAGE ("/") ////////// */}
              <DeckCardsGroup
                header="Newest Decks"
                decks={this.props.decks.slice(-12).sort(() => -1)}
                goToDeckPage={this.goToDeckPage}
                link={"/decks/all"}
                linkText="All Decks =>"
              />

              <DeckCardsGroup
                header="Favorite Decks"
                decks={this.favoriteDecks().slice(0, 4)}
                goToDeckPage={this.goToDeckPage}
                link={"/decks/favorites"}
                linkText="All Favorites =>"
              />
            </Fragment>
          ) : this.props.page === "favorites" ? (
            <Fragment>
              {/* ////////// FAVORITES PAGE ("/decks/favorites") ////////// */}
              <DeckCardsGroup
                header="Favorite Decks"
                decks={this.favoriteDecks()}
                goToDeckPage={this.goToDeckPage}
                link={"/"}
                linkText={"Go Home =>"}
              />
            </Fragment>
          ) : this.props.page === "all" ? (
            <Fragment>
              {/* ////////// ALL PAGE ("/decks/all") ////////// */}
              <DeckCardsGroup
                header="All Decks"
                decks={this.props.decks}
                goToDeckPage={this.goToDeckPage}
                link={"/"}
                linkText={"Go Home =>"}
              />
            </Fragment>
          ) : this.props.page === "my-decks" ? (
            <Fragment>
              {/* ////////// MY DECKS PAGE ("/decks/my-decks") ////////// */}
              <DeckCardsGroup
                header="All Decks"
                decks={this.myDecks()}
                goToDeckPage={this.goToDeckPage}
                link={"/"}
                linkText={"Go Home =>"}
              />
            </Fragment>
          ) : (null)
        }

      </Fragment>
    )
  }
}

export default connect(({ user, decks }) => ({ user, decks }), ({ fetchDecks }))(PageOfDecks)

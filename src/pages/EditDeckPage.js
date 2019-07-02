import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Select, Grid } from 'semantic-ui-react'

import Header from '../components/Header'
import NewDeckCards from '../containers/NewDeckCards'
import { updateDeck } from '../actions/decksActions'
import { fetchCards } from '../actions/cardsActions'
import { beginLoading, endLoading } from '../actions/isLoadingActions'

class EditDeckPage extends Component {

  state = {
    name: "",
    format: "",
    cardsInSelectedFormat: [],
    cardsInDeck: [],
    loadingPeriods: "",
    deck: {},
    deckImage: 0
  }

  componentDidMount() {
    this.props.fetchCards()
    this.interval = setInterval(this.addAPeriod, 500)
    fetch(`http://localhost:3000/decks/${this.props.match.params.id}`)
      .then(r => r.json())
      .then(deck => {
        console.log(deck);
        const cardsInDeck = deck.cards.map(card => ({
          id: card.id,
          title: card.name,
          quantity: deck.deck_cards.find(dc => dc.card_id === card.id).quantity,
          description: card.mana_cost
        }))
        this.setState({
          deck,
          name: deck.name,
          cardsInDeck: cardsInDeck
        })
      })
  }

  componentDidUpdate() {
    if (this.state.cardsInSelectedFormat.length === 0 && this.props.cards.length > 0 && this.state.deck.format) {
      this.filterCardsByFormat(this.state.deck.format)
    }

    if (this.props.user.id && this.state.deck.user_id) {
      if (parseInt(this.props.user.id, 10) !== parseInt(this.state.deck.user_id, 10)) {
        this.props.history.push("/")
      }
    }
  }

  addAPeriod = () => {
    if (this.props.isLoading) {
      this.setState({ loadingPeriods: this.state.loadingPeriods + '.' })
    } else {
      clearInterval(this.interval)
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  filterCardsByFormat = (format) => {
    const filteredCards = this.props.cards.filter(card => {
      return card.legalities[format] === "legal"
    })

    const searchFormattedCards = filteredCards.map(card => {
      return {
        id: card.id,
        title: card.name,
        description: card.mana_cost
      }
    })

    this.setState({
      format: format,
      cardsInSelectedFormat: searchFormattedCards
    })
  }

  setDeckImage = (e, { value }) => this.setState({ deckImage: value })

  updateCardsInDeck = cardsInDeck => this.setState({ cardsInDeck })

  updateDeck = () => {
    let shouldUpdate = true

    for (const card of this.state.cardsInDeck) {
      if (!card.quantity) {
        shouldUpdate = false
    		break
    	}
    }

    if (!this.state.cardsInDeck.length > 0) {
      shouldUpdate = false
    }

    if (!(this.state.name && this.state.format && this.state.deckImage !== 0)) {
      shouldUpdate = false
    }

    if (shouldUpdate) {
      this.props.updateDeck(
        {
          id: this.state.deck.id,
          name: this.state.name,
          cards: this.state.cardsInDeck,
          image: this.state.deckImage
        },
        this.props.history
      )
    }
  }

  render() {
    console.log("EditDeckPage props", this.props);
    console.log("EditDeckPage state", this.state);
    return (
      <Fragment>
        <Header/>

        <div className="row">
          <div className="col-10 offset-1 mt-5">
            <div className="card p-2">

              {
                this.props.isLoading ? (
                  <Fragment>
                    <p style={{textAlign: "center", font: "20px Beleren"}}>
                      Loading all cards{this.state.loadingPeriods}
                    </p>
                    <img
                      style={{margin: "0 auto"}}
                      src="/images/WUBRG.png"
                      className="spin"
                      height="100px"
                      width="100px"
                      alt="spinning mana pentagon"
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <span style={{textAlign: "center", font: "20px Beleren"}} className="mb-2">New Deck</span>

                    <Form onSubmit={this.updateDeck} style={{width: "100%"}}>
                      <Form.Input
                        name="name"
                        label="Deck Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />

                      <hr/>

                      <NewDeckCards
                        cards={this.state.cardsInSelectedFormat}
                        updateCardsInDeck={this.updateCardsInDeck}
                        cardsInDeck={this.state.cardsInDeck}
                        deckImage={this.state.deckImage}
                        setDeckImage={this.setDeckImage}
                      />

                      <Grid>
                        <Grid.Column textAlign="center">
                          <Button className="mt-3" primary type="submit">Update Deck</Button>
                        </Grid.Column>
                      </Grid>
                    </Form>
                  </Fragment>
                )
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

}

export default connect(
  ({ cards, isLoading }) => ({ cards, isLoading }),
  ({ fetchCards, updateDeck, beginLoading, endLoading })
)(EditDeckPage);

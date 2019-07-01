import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Select, Grid } from 'semantic-ui-react'

import Header from '../components/Header'
import NewDeckCards from '../containers/NewDeckCards'
import { createDeck } from '../actions/decksActions'
import { fetchCards } from '../actions/cardsActions'
import { beginLoading, endLoading } from '../actions/isLoadingActions'

class EditDeckPage extends Component {

  state = {
    name: "",
    format: "",
    cardsInSelectedFormat: [],
    cardsInDeck: [],
    loadingPeriods: ""
  }

  componentDidMount() {
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
          name: deck.name,
          cardsInDeck: cardsInDeck
        })
      })
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

  filterCardsByFormat = (e, { value }) => {
    const filteredCards = this.props.cards.filter(card => (
      card.legalities[value] === "legal"
    ))

    const searchFormattedCards = filteredCards.map(card => {
      return {
        id: card.id,
        title: card.name,
        description: card.mana_cost
      }
    })

    this.setState({
      format: value,
      cardsInSelectedFormat: searchFormattedCards,
      cardsInDeck: []
    })
  }

  updateCardsInDeck = cardsInDeck => {
    this.setState({ cardsInDeck })
  }

  createDeck = () => {
    let shouldCreate = true

    for (const card of this.state.cardsInDeck) {
      if (!card.quantity) {
        shouldCreate = false
    		break
    	}
    }

    if (!this.state.cardsInDeck.length > 0) {
      shouldCreate = false
    }

    if (!(this.state.name && this.state.format)) {
      shouldCreate = false
    }

    if (shouldCreate) {
      this.props.createDeck(
        {
          user_id: this.props.userId,
          name: this.state.name,
          format: this.state.format,
          cards: this.state.cardsInDeck
        },
        this.props.history
      )
    }
  }

  render() {
    console.log("EditDeckPage props", this.props);
    // console.log("EditDeckPage state", this.state);
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

                    <Form onSubmit={this.createDeck} style={{width: "100%"}}>
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
                      />

                      <Grid>
                        <Grid.Column textAlign="center">
                          <Button className="mt-3" primary type="submit">Create Deck</Button>
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
  ({ fetchCards, createDeck, beginLoading, endLoading })
)(EditDeckPage);
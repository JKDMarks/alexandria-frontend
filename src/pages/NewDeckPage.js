import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Select, Grid } from 'semantic-ui-react'
// import { Container, Row, Col } from 'react-bootstrap'

import Header from '../components/Header'
import NewDeckCards from '../containers/NewDeckCards'
import { createDeck } from '../actions/decksActions'
import { fetchCards } from '../actions/cardsActions'

const formatOptions = [
  { text: "Standard", value: "standard" },
  { text: "Modern", value: "modern" },
  { text: "Legacy", value: "legacy" },
  { text: "Vintage", value: "vintage" },
  { text: "Pauper", value: "pauper" },
  { text: "Commander/EDH", value: "commander" },
  { text: "Penny Dreadful", value: "penny" }
]

class NewDeckPage extends Component {

  state = {
    name: "",
    image: "",
    format: "",
    cardsInSelectedFormat: [],
    cardsInDeck: []
  }

  componentDidMount() {
    this.props.fetchCards()
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
        description: card.mana_cost,
        image: card.image_uris.art_crop
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

    if (!(this.state.name && this.state.image && this.state.format)) {
      shouldCreate = false
    }

    if (shouldCreate) {
      this.props.createDeck({
        user_id: this.props.userId,
        name: this.state.name,
        format: this.state.format,
        image: this.state.image,
        cards: this.state.cardsInDeck
      })
    }
    // this.props.history.push("/")
  }

  render() {
    // console.log("NewDeckPage props", this.props);
    // console.log("NewDeckPage state", this.state);
    return (
      <Fragment>
        <Header/>

        <div className="row">
          <div className="col-10 offset-1 mt-5">
            <div className="card p-2">
              <span style={{textAlign: "center", font: "20px Beleren"}} className="mb-2">New Deck</span>

              <Form onSubmit={this.createDeck} style={{width: "100%"}}>
                <Form.Input
                  name="name"
                  label="Deck Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />

                <Form.Input
                  className="deck-format-dropdown"
                  name="format"
                  label="Deck Format"
                  placeholder="Select a format to add cards. (Changing formats removes all cards from your deck)"
                  control={Select}
                  options={formatOptions}
                  onChange={this.filterCardsByFormat}
                />

                <Form.Input
                  name="image"
                  label="Deck Image"
                  value={this.state.image}
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
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

}

export default connect(({ cards }) => ({ cards }), ({ fetchCards, createDeck }))(NewDeckPage);

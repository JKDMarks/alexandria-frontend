import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Select, Grid, Checkbox } from 'semantic-ui-react'
// import { Container, Row, Col } from 'react-bootstrap'

import Header from '../components/Header'
import NewDeckCards from '../containers/NewDeckCards'
import { createDeck, createDeckFromDecklist } from '../actions/decksActions'
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
    deckImage: 0,
    format: "",
    cardsInSelectedFormat: [],
    cardsInDeck: [],
    loadingPeriods: "",
    isTextArea: true,
    decklist: ""
  }

  // componentDidMount() {
  //   this.props.fetchCards()
  //   this.interval = setInterval(this.addAPeriod, 500)
  // }

  addAPeriod = () => {
    if (this.props.isLoading) {
      this.setState({ loadingPeriods: this.state.loadingPeriods + '.' })
    } else {
      clearInterval(this.interval)
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setDeckImage = (e, { value }) => this.setState({ deckImage: value })

  toggleTextArea = () => {
    if (this.state.isTextArea && this.props.cards.length === 0) {
      this.props.fetchCards()
      this.interval = setInterval(this.addAPeriod, 500)
    }

    this.setState({ isTextArea: !this.state.isTextArea })
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

  updateCardsInDeck = cardsInDeck => this.setState({ cardsInDeck })

  createDeck = () => {
    let shouldCreate = true

    if (this.state.isTextArea) {
      if (!(this.state.name && this.state.format && this.state.decklist)) {
        shouldCreate = false
      }

      if (shouldCreate) {
        const deckObj = {
          user_id: this.props.userId,
          name: this.state.name,
          format: this.state.format,
          decklist: this.state.decklist
        }

        this.props.createDeckFromDecklist(deckObj, this.props.history)
      }
    } else {

      for (const card of this.state.cardsInDeck) {
        if (!card.quantity) {
          shouldCreate = false
      		break
      	}
      }

      if (!this.state.cardsInDeck.length > 0) {
        shouldCreate = false
      }

      if (!(this.state.name && this.state.format && this.state.deckImage !== 0)) {
        shouldCreate = false
      }

      if (shouldCreate) {
        this.props.createDeck(
          {
            user_id: this.props.userId,
            name: this.state.name,
            format: this.state.format,
            image: this.state.deckImage,
            cards: this.state.cardsInDeck
          },
          this.props.history
        )
      }
    }
  }

  render() {
    // console.log("NewDeckPage props", this.props);
    console.log("NewDeckPage state", this.state);
    return (
      <Fragment>
        <Header/>

        <div className="row">
          <div className="col-10 offset-1 mt-5">
            <div className="card p-2 transparent">

              {
                this.props.isLoading ? (
                  <Fragment>
                    <p style={{textAlign: "center", font: "20px Beleren"}}>
                      Loading all 19,000 cards{this.state.loadingPeriods}
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
                    <p style={{textAlign: "center", font: "20px Beleren"}} className="mb-2">New Deck</p>
                    <Checkbox toggle
                      checked={this.state.isTextArea}
                      style={{margin: "auto"}}
                      label="TextArea Decklist"
                      onChange={this.toggleTextArea}
                    />

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

                      <hr/>

                      {
                        this.state.isTextArea ? (
                          <Form.TextArea
                            style={{height: "250px"}}
                            placeholder={"Decklist, one card per line.\nLeave an empty line between mainboard and sideboard.\n\ne.g.\t4 Collected Company\n\t4 Chord of Calling\n\t4 Devoted Druid\n\t4 Vizier of Remedies\n\n\t4 Leyline of Sanctity\n\t3 Thoughtseize\n\t3 Stony Silence\n\tetc..."}
                            value={this.state.decklist}
                            onChange={(e, { value }) => this.setState({ decklist: value })}
                          />
                        ) : (
                          <NewDeckCards
                            cards={this.state.cardsInSelectedFormat}
                            updateCardsInDeck={this.updateCardsInDeck}
                            cardsInDeck={this.state.cardsInDeck}
                            deckImage={this.state.deckImage}
                            setDeckImage={this.setDeckImage}
                          />
                        )
                      }

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
  ({ fetchCards, createDeck, createDeckFromDecklist })
)(NewDeckPage);

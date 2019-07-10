import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Grid, Message, Checkbox } from 'semantic-ui-react'

import Header from '../components/Header'
import { createDeck, createDeckFromURL } from '../actions/decksActions'

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
    format: "",
    image: "",
    decklist: "",
    errors: [],
    isByURL: false,
    deckURL: "",
  }

  handleChange = (e, { value }) => this.setState({ [e.target.name]: value })

  setDeckImage = (e, { value }) => this.setState({ deckImage: value })

  updateCardsInDeck = cardsInDeck => this.setState({ cardsInDeck })

  selectFormat = (e, { value }) => this.setState({ format: value })

  createDeck = () => {
    this.setState({ errors: [] })
    let shouldCreate = true

    if (this.state.isByURL) {
      if (!this.state.deckURL) {
        shouldCreate = false
        this.setState(state => ({ errors: [...state.errors, "Add a valid decklist URL"] }))
      }

      if (shouldCreate) {
        this.props.createDeckFromURL(
          {userId: this.props.userId, deckURL: this.state.deckURL},
          this.props.history
        )
      }
    } else {
      if (!this.state.name) {
        shouldCreate = false
        this.setState(state => ({ errors: [...state.errors, "Add a deck name"] }))
      }

      if (!this.state.format) {
        shouldCreate = false
        this.setState(state => ({ errors: [...state.errors, "Select a deck format"] }))
      }

      if (!this.state.image) {
        shouldCreate = false
        this.setState(state => ({ errors: [...state.errors, "Choose a valid URL to be the display image for this deck"] }))
      }

      if (!this.state.decklist) {
        shouldCreate = false
        this.setState(state => ({ errors: [...state.errors, "Add cards to the decklist"] }))
      }

      if (shouldCreate) {
        const deckObj = {
          user_id: this.props.userId,
          name: this.state.name,
          format: this.state.format,
          decklist: this.state.decklist,
          image: this.state.image
        }

        this.props.createDeck(deckObj, this.props.history)
      }
    }
  }


  render() {
    // console.log("NewDeckPage props", this.props);
    // console.log("NewDeckPage state", this.state);
    return (
      <Fragment>
        <Header/>

        <div className="row">
          <div className="col-10 offset-1 mt-5">
            <div className="card p-2 transparent">
              <Fragment>
                <p style={{textAlign: "center", font: "20px Beleren"}} className="mb-2">New Deck</p>
                <div style={{alignItems: "center", display: "flex", justifyContent: "center"}}>
                  <Checkbox toggle
                    value={this.state.isByURL}
                    onChange={() => this.setState(state => ({ isByURL: !state.isByURL, errors: [] }))}
                    label="New Deck From URL"
                  />
                </div>

                <Form onSubmit={this.createDeck} style={{width: "100%"}}>
                  {
                    this.state.errors.length > 0 ? (
                      <Message negative>
                        { this.state.errors.map(error => <Fragment>{error}<br/></Fragment>) }
                      </Message>
                    ) : null
                  }

                  {
                    this.state.isByURL ? (
                      <Form.Input
                        name="deckURL"
                        label="Deck URL"
                        checked={this.state.deckURL}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <Fragment>
                        <Form.Input
                          name="name"
                          label="Deck Name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />

                        <Form.Select
                          name="format"
                          label="Deck Format"
                          placeholder="Select a deck format"
                          options={formatOptions}
                          onChange={this.selectFormat}
                        />

                        <Form.Input
                          name="image"
                          label="Deck Image URL"
                          placeholder="Image URL here"
                          value={this.state.image}
                          onChange={this.handleChange}
                        />

                        <Form.TextArea
                          label="Decklist"
                          style={{height: "250px"}}
                          placeholder={"Decklist, one card per line.\nLeave an empty line between mainboard and sideboard.\n\ne.g.\t4 Collected Company\n\t4 Chord of Calling\n\t4 Devoted Druid\n\t4 Vizier of Remedies\n\n\t4 Leyline of Sanctity\n\t3 Thoughtseize\n\t3 Stony Silence\n\tetc..."}
                          value={this.state.decklist}
                          onChange={(e, { value }) => this.setState({ decklist: value })}
                        />
                      </Fragment>
                    )
                  }

                  <Grid>
                    <Grid.Column textAlign="center">
                      <Form.Button className="mt-3" primary type="submit">Create Deck</Form.Button>
                    </Grid.Column>
                  </Grid>
                </Form>
              </Fragment>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

}

export default connect(null, ({ createDeck, createDeckFromURL }))(NewDeckPage);

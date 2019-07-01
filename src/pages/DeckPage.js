import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'
import { fetchDecks } from '../actions/decksActions'
import { fetchCards } from '../actions/cardsActions'
import Header from '../components/Header'

class DeckPage extends Component {

  state = {
    deck: {},
    byTypeObj: {
      creature: [],
      planeswalker: [],
      artifact: [],
      enchantment: [],
      instant: [],
      sorcery: [],
      land: []
    },
    cardImg: ""
  }

  componentDidMount() {
    fetch(`http://localhost:3000/decks/${this.props.match.params.id}`)
      .then(r => r.json())
      .then(deck => {
        if (deck.id) {
          const byTypeObj = { creature: [], planeswalker: [], artifact: [], enchantment: [], instant: [], sorcery: [], land: [] }

          for (const card of deck.cards) {
            const type = card.types[card.types.length - 1].toLowerCase()
            byTypeObj[type].push(card)
          }

          this.setState({ deck, byTypeObj: byTypeObj })
        } else {
          this.props.history.push("/")
        }
      })
  }

  showCardImg = imagesObj => {
    this.setState({ cardImg: imagesObj.normal })
  }

  renderUlOfType = type => {
    const deck = this.state.deck
    const typeLine = type.slice(0, 1).toUpperCase() + type.slice(1) + 's'

    return (
      <Fragment key={type}>
        <h5>{typeLine}</h5>
        <ul style={{paddingLeft: "20px"}}>
          {
            this.state.byTypeObj[type].map(card => {
              const deck_card = deck.deck_cards.find(dc => dc.card_id === card.id)
              return (
                <li key={card.id} className="card-li" onMouseOver={() => this.showCardImg(card.image_uris)}>
                  {deck_card.quantity} {card.name}
                </li>
              )
            })
          }
        </ul>
      </Fragment>
    )
  }

  renderNonlandColumn = () => {
    return (
      <Grid.Column>
        {
          Object.keys(this.state.byTypeObj).map(type => {
            if (type !== "land" && this.state.byTypeObj[type].length > 0) {
              return this.renderUlOfType(type)
            } else {
              return null
            }
          })
        }
      </Grid.Column>
    )
  }

  renderLandColumn = () => {
    return (
      <Grid.Column>
        { this.renderUlOfType("land") }
        <img alt="card art" src={this.state.cardImg} style={{width: "100%"}}/>
      </Grid.Column>
    )
  }

  render() {
    // console.log("DeckPage props", this.props);
    // console.log("DeckPage state", this.state);

    return (
      <Fragment>
        <Header/>
        {
          this.state.deck.id ? (
            <Segment className="m-3">
              <h4 style={{fontFamily: "Beleren", textAlign: "center"}}>{this.state.deck.name}</h4>

              <Grid textAlign="left" columns={2}>
                { this.renderNonlandColumn() }

                { this.renderLandColumn() }
              </Grid>
            </Segment>
          ) : null
        }
      </Fragment>
    );
  }

}

export default connect(({ decks, cards }) => ({ decks, cards }), ({ fetchDecks, fetchCards }))(DeckPage);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Grid, Message } from 'semantic-ui-react'

import Header from '../components/Header'
import { updateDeck } from '../actions/decksActions'

const formatOptions = [
  { text: "Standard", value: "standard" },
  { text: "Modern", value: "modern" },
  { text: "Legacy", value: "legacy" },
  { text: "Vintage", value: "vintage" },
  { text: "Pauper", value: "pauper" },
  { text: "Commander/EDH", value: "commander" },
  { text: "Penny Dreadful", value: "penny" }
]

class EditDeckPage extends Component {

  state = {
    name: "",
    format: "",
    image: "",
    decklist: "",
    errors: [],
  }

  componentDidMount() {
    fetch(`http://localhost:3000/decks/${this.props.match.params.id}`)
      .then(r => r.json())
      .then(deck => {
        if (deck.status === 404) {
          this.props.history.push("/")
        }
        const { name, format, image, decklist } = deck
        this.setState({ name, format, image, decklist })
      })
  }

  handleChange = (e, { value }) => this.setState({ [e.target.name]: value })

  setDeckImage = (e, { value }) => this.setState({ deckImage: value })

  updateCardsInDeck = cardsInDeck => this.setState({ cardsInDeck })

  selectFormat = (e, { value }) => this.setState({ format: value })

  updateDeck = () => {
    this.setState({ errors: [] })
    let shouldUpdate = true

    if (!this.state.name) {
      shouldUpdate = false
      this.setState(state => ({ errors: [...state.errors, "Add a deck name"] }))
    }

    if (!this.state.format) {
      shouldUpdate = false
      this.setState(state => ({ errors: [...state.errors, "Select a deck format"] }))
    }

    if (!this.state.image) {
      shouldUpdate = false
      this.setState(state => ({ errors: [...state.errors, "Choose a valid URL to be the display image for this deck"] }))
    }

    if (!this.state.decklist) {
      shouldUpdate = false
      this.setState(state => ({ errors: [...state.errors, "Add cards to the decklist"] }))
    }

    if (shouldUpdate) {
      const deckObj = {
        id: this.props.match.params.id,
        name: this.state.name,
        format: this.state.format,
        decklist: this.state.decklist,
        image: this.state.image
      }

      this.props.updateDeck(deckObj, this.props.history)
    }
  }


  render() {
    // console.log("EditDeckPage props", this.props);
    // console.log("EditDeckPage state", this.state);
    return (
      <Fragment>
        <Header/>

        <div className="row">
          <div className="col-10 offset-1 mt-5">
            <div className="card p-2 transparent">
              <Fragment>
                <p style={{textAlign: "center", font: "20px Beleren"}} className="mb-2">Edit Deck</p>

                <Form onSubmit={this.updateDeck} style={{width: "100%"}}>
                  {
                    this.state.errors.length > 0 ? (
                      <Message negative>
                        { this.state.errors.map(error => <Fragment>{error}<br/></Fragment>) }
                      </Message>
                    ) : null
                  }

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
                    value={this.state.format}
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

                  <Grid>
                    <Grid.Column textAlign="center">
                      <Form.Button className="mt-3" primary type="submit">Update Deck</Form.Button>
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

export default connect(null, ({ updateDeck }))(EditDeckPage);

// import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux'
// import { Form, Button, Grid } from 'semantic-ui-react'
//
// import Header from '../components/Header'
// import NewDeckCards from '../containers/NewDeckCards'
// import { updateDeck } from '../actions/decksActions'
// import { fetchCards } from '../actions/cardsActions'
// import { beginLoading, endLoading } from '../actions/isLoadingActions'
//
// class EditDeckPage extends Component {
//
//   state = {
//     name: "",
//     format: "",
//     cardsInSelectedFormat: [],
//     cardsInDeck: [],
//     loadingPeriods: "",
//     deck: {},
//     deckImage: 0
//   }
//
//   componentDidMount() {
//     this.props.fetchCards()
//     this.interval = setInterval(this.addAPeriod, 500)
//     fetch(`http://localhost:3000/decks/${this.props.match.params.id}`)
//       .then(r => r.json())
//       .then(deck => {
//         const cardsInDeck = deck.deck_cards.map(deckCard => {
//           const card = deck.cards.find(card => card.id === deckCard.card_id)
//
//           return {
//             id: card.id,
//             title: card.name,
//             quantity: deckCard.quantity,
//             sideboard: deckCard.sideboard,
//             description: card.mana_cost
//           }
//         })
//
//         this.setState({
//           deck,
//           name: deck.name,
//           cardsInDeck
//         })
//       })
//   }
//
//   componentDidUpdate() {
//     if (this.state.cardsInSelectedFormat.length === 0 && this.props.cards.length > 0 && this.state.deck.format) {
//       this.filterCardsByFormat(this.state.deck.format)
//     }
//
//     if (this.props.user.id && this.state.deck.user_id) {
//       if (parseInt(this.props.user.id, 10) !== parseInt(this.state.deck.user_id, 10)) {
//         this.props.history.push("/")
//       }
//     }
//   }
//
//   addAPeriod = () => {
//     if (this.props.isLoading) {
//       this.setState({ loadingPeriods: this.state.loadingPeriods + '.' })
//     } else {
//       clearInterval(this.interval)
//     }
//   }
//
//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value })
//   }
//
//   filterCardsByFormat = (format) => {
//     const filteredCards = this.props.cards.filter(card => {
//       return card.legalities[format] === "legal"
//     })
//
//     const searchFormattedCards = filteredCards.map(card => {
//       return {
//         id: card.id,
//         title: card.name,
//         description: card.mana_cost
//       }
//     })
//
//     this.setState({
//       format: format,
//       cardsInSelectedFormat: searchFormattedCards
//     })
//   }
//
//   setDeckImage = (e, { value }) => this.setState({ deckImage: value })
//
//   updateCardsInDeck = cardsInDeck => this.setState({ cardsInDeck })
//
//   updateDeck = () => {
//     let shouldUpdate = true
//
//     for (const card of this.state.cardsInDeck) {
//       if (!card.quantity) {
//         shouldUpdate = false
//     		break
//     	}
//     }
//
//     if (!this.state.cardsInDeck.length > 0) {
//       shouldUpdate = false
//     }
//
//     if (!(this.state.name && this.state.format && this.state.deckImage !== 0)) {
//       shouldUpdate = false
//     }
//
//     if (shouldUpdate) {
//       this.props.updateDeck(
//         {
//           id: this.state.deck.id,
//           name: this.state.name,
//           cards: this.state.cardsInDeck,
//           image: this.state.deckImage
//         },
//         this.props.history
//       )
//     }
//   }
//
//   render() {
//     console.log("EditDeckPage props", this.props);
//     console.log("EditDeckPage state", this.state);
//     return (
//       <Fragment>
//         <Header/>
//
//         <div className="row">
//           <div className="col-10 offset-1 mt-5">
//             <div className="card p-2">
//
//               {
//                 this.props.isLoading ? (
//                   <Fragment>
//                     <p style={{textAlign: "center", font: "20px Beleren"}}>
//                       Loading all cards{this.state.loadingPeriods}
//                     </p>
//                     <img
//                       style={{margin: "0 auto"}}
//                       src="/images/WUBRG.png"
//                       className="spin"
//                       height="100px"
//                       width="100px"
//                       alt="spinning mana pentagon"
//                     />
//                   </Fragment>
//                 ) : (
//                   <Fragment>
//                     <span style={{textAlign: "center", font: "20px Beleren"}} className="mb-2">New Deck</span>
//
//                     <Form onSubmit={this.updateDeck} style={{width: "100%"}}>
//                       <Form.Input
//                         name="name"
//                         label="Deck Name"
//                         value={this.state.name}
//                         onChange={this.handleChange}
//                       />
//
//                       <hr/>
//
//                       <NewDeckCards
//                         cards={this.state.cardsInSelectedFormat}
//                         updateCardsInDeck={this.updateCardsInDeck}
//                         cardsInDeck={this.state.cardsInDeck}
//                         deckImage={this.state.deckImage}
//                         setDeckImage={this.setDeckImage}
//                       />
//
//                       <Grid>
//                         <Grid.Column textAlign="center">
//                           <Button className="mt-3" primary type="submit">Update Deck</Button>
//                         </Grid.Column>
//                       </Grid>
//                     </Form>
//                   </Fragment>
//                 )
//               }
//             </div>
//           </div>
//         </div>
//       </Fragment>
//     );
//   }
//
// }
//
// export default connect(
//   ({ cards, isLoading }) => ({ cards, isLoading }),
//   ({ fetchCards, updateDeck, beginLoading, endLoading })
// )(EditDeckPage);

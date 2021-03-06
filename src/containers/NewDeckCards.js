import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Card, Dropdown, Icon, Radio } from 'semantic-ui-react'

import NewDeckSearch from '../components/NewDeckSearch'

class NewDeckCards extends Component {

  addCardToDeck = card => {
    const findCard = this.props.cardsInDeck.find(cardInDeck => cardInDeck.id === card.id)
    if (!findCard) {
      this.props.updateCardsInDeck([ ...this.props.cardsInDeck, card ])
    }
  }

  changeCardQuantity = (e, { value }) => {
    const cardId = parseInt(e.target.closest(".has-card-id").id, 10)
    const cardsInDeck = this.props.cardsInDeck.map(card => {
      if (card.id === cardId) {
        const cardCopy = { ...card }
        cardCopy.quantity = value
        return cardCopy
      } else {
        return card
      }
    })

    this.props.updateCardsInDeck(cardsInDeck)
  }

  removeCard = e => {
    const cardId = parseInt(e.target.closest(".has-card-id").id, 10)
    const filterCards = this.props.cardsInDeck.filter(card => card.id !== cardId)
    this.props.updateCardsInDeck(filterCards)
  }

  renderCardsInDeck = () => {
    return this.props.cardsInDeck.map(card => (
        <Card
          key={card.id} id={card.id}
          className={`has-card-id py-2 ${this.props.deckImage === card.id ? "green-background" : ""}`}
          style={{height: "38px", width: "auto"}}

        >
          <Container>
            <Row>
              <Col xs={7} style={{height: "24px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                {card.title}
              </Col>

              <Col xs={3}>
                <Dropdown
                  onChange={this.changeCardQuantity}
                  value={card.quantity}
                  placeholder="Quantity"
                  options={[
                    { key: 1, text: 1, value: 1 },
                    { key: 2, text: 2, value: 2 },
                    { key: 3, text: 3, value: 3 },
                    { key: 4, text: 4, value: 4 },
                  ]}
                />
              </Col>

              <Col xs={1} className="pl-1">
                <Radio
                  name="deckImage"
                  value={card.id}
                  checked={this.props.deckImage === card.id}
                  onChange={this.props.setDeckImage}
                />
              </Col>

              <Col xs={1} className="p-0" style={{marginTop: "-2px"}}>
                <Button onClick={this.removeCard} variant="danger" size="sm">
                  <Icon name="x" className="ml-1"/>
                </Button>
              </Col>
            </Row>
          </Container>
        </Card>
      )
    )
  }

  render() {
    // console.log("NewDeckCards props", this.props)
    return (
      <Fragment>
        <p style={{textAlign: "center", font: "15px Beleren"}} className="mb-2">Cards in Deck</p>

        {
          this.props.cardsInDeck.length > 0 ? (
            <p style={{textAlign: "center", color: "red", fontSize: "10px"}}>
              (Between Quantity and Delete, select that card to have it as the deck cover image.)
            </p>
          ) : (null)
        }

        { this.renderCardsInDeck() }

        <NewDeckSearch cards={this.props.cards} handleSearchResult={this.addCardToDeck}/>
      </Fragment>
    )
  }

}

export default NewDeckCards

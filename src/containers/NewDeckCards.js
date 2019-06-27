import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Card, Dropdown, Icon } from 'semantic-ui-react'

import NewDeckSearch from '../components/NewDeckSearch'

class NewDeckCards extends Component {

  addCardToDeck = card => {
    this.props.updateCardsInDeck([ ...this.props.cardsInDeck, card ])
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
        className="has-card-id py-2"
        style={{height: "38px", width: "auto"}}
      >
        <Container>
          <Row>
            <Col xs={8} style={{height: "24px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
              {card.title}
            </Col>

            <Col xs={3}>
              <Dropdown
                onChange={this.changeCardQuantity}
                placeholder="Quantity"
                options={[
                  { key: 1, text: 1, value: 1 },
                  { key: 2, text: 2, value: 2 },
                  { key: 3, text: 3, value: 3 },
                  { key: 4, text: 4, value: 4 },
                ]}
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
    ))
  }

  render() {
    // console.log("NewDeckCards props", this.props)
    return (
      <Fragment>
        <p style={{textAlign: "center", font: "15px Beleren"}} className="mb-2">Cards in Deck</p>

        { this.renderCardsInDeck() }

        <NewDeckSearch cards={this.props.cards} addCardToDeck={this.addCardToDeck}/>
      </Fragment>
    )
  }

}

export default NewDeckCards

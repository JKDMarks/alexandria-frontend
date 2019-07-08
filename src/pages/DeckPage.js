import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Segment, Button } from 'semantic-ui-react'
import { fetchUser } from '../actions/userActions'
import Header from '../components/Header'
import moment from 'moment'

class DeckPage extends Component {

  state = {
    deck: {},
    mainboardCount: 0,
    sideboardCount: 0,
    byTypeObj: {
      creature: [],
      planeswalker: [],
      artifact: [],
      enchantment: [],
      instant: [],
      sorcery: [],
      land: []
    },
    imgSrc: "",
    imgDisplay: "none",
    imgTop: 0,
    imgLeft: 0
  }

  componentDidMount() {
    this.props.fetchUser()
    fetch(`http://localhost:3000/decks/${this.props.match.params.id}`)
      .then(r => r.json())
      .then(deck => {
        if (deck.id) {
          const byTypeObj = { creature: [], planeswalker: [], artifact: [], enchantment: [], instant: [], sorcery: [], land: [] }

          for (const card of deck.cards) {
            const type = card.types[card.types.length - 1].toLowerCase()
            const isDuplicate = byTypeObj[type].find(cardInTypeObj => cardInTypeObj.id === card.id)

            if (!isDuplicate) {
              byTypeObj[type].push(card)
            }
          }

          this.setState({ deck, byTypeObj: byTypeObj, imgSrc: deck.image })
        } else {
          this.props.history.push("/")
        }
      })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.deck.id && this.state.deck.id) {
      let mainboardCount = 0
      let sideboardCount = 0

      for (const deck_card of this.state.deck.deck_cards) {
        if (deck_card.sideboard) {
          sideboardCount += deck_card.quantity
        } else {
          mainboardCount += deck_card.quantity
        }
      }

      this.setState({ mainboardCount, sideboardCount })
    }
  }

  handleEditClick = () => {
    this.props.history.push(`/decks/${this.state.deck.id}/edit`)
  }

  handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this deck?")

    if (confirmDelete) {
      fetch(`http://localhost:3000/decks/${this.state.deck.id}`, {
        method: "DELETE"
      }).then(r => r.json())
        .then(data => this.props.history.push("/"))
    }
  }

  showCardImg = (image, e) => this.setState({
    imgSrc: image,
    imgDisplay: "",
    imgTop: e.clientY, // + document.querySelector("#sideboard-ul").clientHeight - 300,
    imgLeft: e.clientX
  })

  resetCardImg = () => this.setState({ imgSrc: "", imgDisplay: "none" })

  renderUlOfType = type => {
    const deck = this.state.deck
    let typeLine = type.slice(0, 1).toUpperCase() + type.slice(1) + 's'
    if (typeLine === "Sorcerys") {
      typeLine = "Sorceries"
    }

    return (
      <Fragment key={type}>
        <h5>{typeLine}</h5>
        <ul>
          {
            this.state.byTypeObj[type].map(card => {
              const deck_card = deck.deck_cards.find(dc => dc.card_id === card.id)
              if (deck_card.sideboard) {
                return null
              } else {
                return (
                  <li
                    key={"mainboard-" + card.id}
                    className="link-li"
                    onMouseEnter={e => this.showCardImg(card.image_uris.normal, e)}
                    onMouseLeave={() => this.resetCardImg()}
                  >
                    {deck_card.quantity} {card.name}
                  </li>
                )
              }
            })
          }
        </ul>
      </Fragment>
    )
  }

  renderFirstColumn = () => {
    return (
      <Grid.Column>
        <h4>Mainboard ({this.state.mainboardCount})</h4>
        {
          Object.keys(this.state.byTypeObj).map(type => {
            if (type !== "land" && this.state.byTypeObj[type].length > 0) {
              return this.renderUlOfType(type)
            } else {
              return null
            }
          })
        }

        { this.renderUlOfType("land") }
      </Grid.Column>
    )
  }

  renderSecondColumn = () => {
    return (
      <Grid.Column>
        <h4>Sideboard ({this.state.sideboardCount})</h4>
        <ul id="sideboard-ul">
          {
            this.state.deck.deck_cards.filter(deck_card => deck_card.sideboard).map(deck_card => {
              const card = this.state.deck.cards.find(card => card.id === deck_card.card_id)

              return (
                <li
                  key={"sideboard-" + card.id}
                  className="link-li"
                  onMouseEnter={e => this.showCardImg(card.image_uris.normal, e)}
                  onMouseLeave={() => this.resetCardImg()}
                >
                  {deck_card.quantity} {card.name}
                </li>
              )
            })
          }
        </ul>
      </Grid.Column>
    )
  }

  render() {
    // console.log("DeckPage props", this.props);
    console.log("DeckPage state", this.state);

    return (
      <Fragment>
        <Header/>
        {
          this.state.deck.id && this.props.user ? (
            <Segment className="m-3">
              <h4 style={{fontFamily: "Beleren", textAlign: "center"}}>
                {this.state.deck.name}
                {
                  this.state.deck.user_id === this.props.user.id ? (
                    <Fragment>
                      &nbsp;
                      <Button size="mini" color="yellow" onClick={this.handleEditClick}>Edit</Button>
                      &nbsp;
                      <Button size="mini" color="red" onClick={this.handleDeleteClick}>Delete</Button>
                    </Fragment>
                  ) : (null)
                }
              </h4>

              <Grid textAlign="left" columns={2}>
                { this.renderFirstColumn() }

                { this.renderSecondColumn() }
              </Grid>

              <img
                alt="card art" src={this.state.imgSrc}
                style={{
                  position: "fixed",
                  maxHeight: "300px",
                  margin: "auto",
                  top: this.state.imgTop,
                  left: this.state.imgLeft + 25,
                  display: this.state.imgDisplay
                }}
              />

              <p style={{fontSize: "10px", opacity: "0.75", color: "gray", textAlign: "center"}}>
                Created by <Link to={`/users/${this.state.deck.user.id}`}>{this.state.deck.user.username}</Link> on {moment(this.state.deck.created_at).format('MMM D YYYY, h:mm a')}
              </p>
            </Segment>
          ) : null
        }
      </Fragment>
    );
  }

}

export default connect(
  ({ user }) => ({ user }),
  ({ fetchUser })
)(DeckPage);

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Segment, Button } from 'semantic-ui-react'
import { fetchUser } from '../actions/userActions'
import Header from '../components/Header'
import moment from 'moment'

import { Chart } from 'primereact/chart'

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
    imgLeft: 0,
    cmcData: {},
    cmcOptions: {},
    landsColorsData: {},
    spellsColorsData: {},
  }

  componentDidMount() {
    const colorsIndexObj = {W: 0, U: 1, B: 2, R: 3, G: 4, gold: 5, colorless: 6}

    const cmcData = {
      labels: [],
      datasets: [
        { label: 'White', backgroundColor: '#FFFBD5', data: [] },
        { label: 'Blue', backgroundColor: '#AAE0FA', data: [] },
        { label: 'Black', backgroundColor: '#C2BCBA', data: [] },
        { label: 'Red', backgroundColor: '#FAAA8F', data: [] },
        { label: 'Green', backgroundColor: '#9BD3AE', data: [] },
        { label: 'Gold', backgroundColor: 'gold', data: [] },
        { label: 'Colorless', backgroundColor: 'darkslategray', data: [] }
      ]
    }

    const cmcOptions = {
      tooltips: { mode: 'index', intersect: false },
      responsive: true,
      scales: {
        xAxes: [{ stacked: true }],
        yAxes: [{ stacked: true }]
      }
    }

    const spellsColorsData = {
      labels: ['White', 'Blue', 'Black', 'Red', 'Green'],
      datasets: [
        {
          data: [0, 0, 0, 0, 0],
          backgroundColor: [ "#FFFBD5", "#AAE0FA", "#C2BCBA", "#FAAA8F", "#9BD3AE" ],
          hoverBackgroundColor: [ "#FFFBD5", "#AAE0FA", "#C2BCBA", "#FAAA8F", "#9BD3AE" ]
        }
      ]
    }

    const landsColorsData = {
      labels: ['White', 'Blue', 'Black', 'Red', 'Green'],
      datasets: [
        {
          data: [0, 0, 0, 0, 0],
          backgroundColor: [ "#FFFBD5", "#AAE0FA", "#C2BCBA", "#FAAA8F", "#9BD3AE" ],
          hoverBackgroundColor: [ "#FFFBD5", "#AAE0FA", "#C2BCBA", "#FAAA8F", "#9BD3AE" ]
        }
      ]
    }

    this.props.fetchUser()
    fetch(`http://localhost:3000/decks/${this.props.match.params.id}`)
      .then(r => r.json())
      .then(deck => {
        if (deck.id) {
          const byTypeObj = { creature: [], planeswalker: [], artifact: [], enchantment: [], instant: [], sorcery: [], land: [] }

          for (const card of deck.cards) {
            const type = card.types[card.types.length - 1].toLowerCase()
            const isDuplicate = byTypeObj[type].find(cardInTypeObj => cardInTypeObj.id === card.id)
            const deck_cards = deck.deck_cards.filter(deck_card => deck_card.card_id === card.id)
            const isInMainBoard = deck_cards.find(deck_card => !deck_card.sideboard)

            if (!isDuplicate && isInMainBoard) {
              byTypeObj[type].push(card)
            }

            for (const deck_card of deck_cards) {
              let color
              if (card.colors.length === 0) {
                color = "colorless"
              } else if (card.colors.length === 1) {
                color = card.colors[0]
              } else {
                color = "gold"
              }

              const datasetIndex = colorsIndexObj[color]
              cmcData.labels[card.cmc - 1] = `${card.cmc -1} CMC`
              cmcData.datasets[datasetIndex].data[card.cmc - 1] ? cmcData.datasets[datasetIndex].data[card.cmc - 1] += deck_card.quantity : cmcData.datasets[datasetIndex].data[card.cmc - 1] = deck_card.quantity

              if (card.types.includes("Land")) {
                for (const color of card.color_identity) {
                  landsColorsData.datasets[0].data[colorsIndexObj[color]] += 1
                }
              } else {
                for (const color of card.colors) {
                  spellsColorsData.datasets[0].data[colorsIndexObj[color]] += 1
                }
              }
            }
          }

          for (const [i, label] of cmcData.labels.entries()) {
            if (!label) {
              cmcData.labels[i] = `${i} CMC`
            }
          }

          for (const [dataInd] of cmcData.datasets.entries()) {
            for (const [i, datum] of cmcData.datasets[dataInd].data.entries()) {
              if (!datum) {
                cmcData.datasets[dataInd].data[i] = 0
              }
            }
          }

          this.setState({ deck, byTypeObj: byTypeObj, imgSrc: deck.image, cmcData, cmcOptions, landsColorsData, spellsColorsData })
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
    imgTop: e.clientY + 300 > window.innerHeight ? e.clientY - 300 : e.clientY, // + document.querySelector("#sideboard-ul").clientHeight - 300,
    imgLeft: e.clientX + 215 > window.innerWidth ? e.clientX - 215 : e.clientX
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
      </Grid.Column>
    )
  }

  renderSecondColumn = () => {
    return (
      <Grid.Column>
        { this.renderUlOfType("land") }

        <hr/>

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
    // console.log("DeckPage props", this.props)
    // console.log("DeckPage state", this.state)

    return (
      <Fragment>
        <Header/>
        {
          this.state.deck.id && this.props.user ? (
            <Segment className="m-3 transparent">
              <h4 style={{fontFamily: "Beleren", textAlign: "center"}}>
                {this.state.deck.name}
              </h4>
              {
                this.state.deck.user_id === this.props.user.id ? (
                  <p style={{textAlign: "center"}}>
                    &nbsp;
                    <Button size="mini" color="yellow" onClick={this.handleEditClick}>Edit</Button>
                    &nbsp;
                    <Button size="mini" color="red" onClick={this.handleDeleteClick}>Delete</Button>
                  </p>
                ) : (null)
              }

              <Grid textAlign="left" columns={2}>
                { this.renderFirstColumn() }

                { this.renderSecondColumn() }
              </Grid>

              <hr/>

              <p className="mb-3" style={{textAlign: "center", font: "20px Beleren"}}><u>Deck Stats</u></p>

              <h5 style={{font: "16px Beleren", textAlign: "center"}}>Mana Curve</h5>
              <Chart type="bar" data={this.state.cmcData} options={this.state.cmcOptions} />

              <Grid columns={2}>
                <Grid.Column>
                  <h5 style={{font: "16px Beleren", textAlign: "center"}}>Spell Colors</h5>
                  <Chart type="pie" data={this.state.spellsColorsData}/>
                </Grid.Column>

                <Grid.Column>
                  <h5 style={{font: "16px Beleren", textAlign: "center"}}>Land Colors</h5>
                  <Chart type="pie" data={this.state.landsColorsData}/>
                </Grid.Column>
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

              <p style={{fontSize: "10px", opacity: "0.75", color: "darkslategray", textAlign: "center"}}>
                Created by <Link to={`/users/${this.state.deck.user.id}`}>{this.state.deck.user.username}</Link> on {moment(this.state.deck.created_at).format('MMM D YYYY, h:mm a')}
              </p>
            </Segment>
          ) : null
        }
      </Fragment>
    )
  }

}

export default connect(
  ({ user }) => ({ user }),
  ({ fetchUser })
)(DeckPage)

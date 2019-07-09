import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NoMatchPage extends Component {

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <img src="https://img.scryfall.com/cards/art_crop/en/gtc/54.jpg?1517813031" alt="Totally Lost"/>
        <br/>
        <Link to="/">Go Home =></Link>
      </div>
    );
  }

}

export default NoMatchPage

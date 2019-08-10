import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NoMatchPage extends Component {

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <img src="https://img.scryfall.com/cards/art_crop/front/e/c/ec8e4142-7c46-4d2f-aaa6-6410f323d9f0.jpg?1561851198" alt="Totally Lost"/>
        <br/>
        <Link to="/">Go Home =></Link>
      </div>
    );
  }

}

export default NoMatchPage

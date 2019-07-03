import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

class WUBRGBanner extends Component {

  render() {
    switch (this.props.size) {
      case "small":
        return (
          <Grid className="m-0 pb-2" centered>
            <Grid.Column width={1} className="p-1"><img style={{height: "15px", width: "15px"}} src="/images/W.png" alt="white mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1"><img style={{height: "15px", width: "15px"}} src="/images/U.png" alt="blue mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1"><img style={{height: "15px", width: "15px"}} src="/images/B.png" alt="black mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1"><img style={{height: "15px", width: "15px"}} src="/images/R.png" alt="red mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1"><img style={{height: "15px", width: "15px"}} src="/images/G.png" alt="green mana symbol"/></Grid.Column>
          </Grid>
        )

      case "medium":
        return (
          <Grid className="m-0 pb-2" centered>
            <Grid.Column width={1} className="p-1 mx-3"><img src="/images/W.png" alt="white mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1 mx-3"><img src="/images/U.png" alt="blue mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1 mx-3"><img src="/images/B.png" alt="black mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1 mx-3"><img src="/images/R.png" alt="red mana symbol"/></Grid.Column>
            <Grid.Column width={1} className="p-1 mx-3"><img src="/images/G.png" alt="green mana symbol"/></Grid.Column>
          </Grid>
        )

      case "large":
        return (
          <Grid className="m-0 pb-2" centered>
            <Grid.Column width={2} className="p-1 mx-3"><img src="/images/W.png" alt="white mana symbol"/></Grid.Column>
            <Grid.Column width={2} className="p-1 mx-3"><img src="/images/U.png" alt="blue mana symbol"/></Grid.Column>
            <Grid.Column width={2} className="p-1 mx-3"><img src="/images/B.png" alt="black mana symbol"/></Grid.Column>
            <Grid.Column width={2} className="p-1 mx-3"><img src="/images/R.png" alt="red mana symbol"/></Grid.Column>
            <Grid.Column width={2} className="p-1 mx-3"><img src="/images/G.png" alt="green mana symbol"/></Grid.Column>
          </Grid>
        )

      default:
        return null
    }
  }

}

export default WUBRGBanner;

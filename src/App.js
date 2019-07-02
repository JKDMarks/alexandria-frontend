import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Pages from './pages'
import withAuth from './hocs/withAuth'

class App extends Component {
  render() {
    // console.log("App props", this.props)
    return (
      <Switch>
        <Route exact path="/decks/:id" render={props => <Pages.DeckPage {...props} />}/>
        <Route exact path="/decks/:id/edit" render={props => <Pages.EditDeckPage {...props} user={this.props.user} />}/>
        <Route exact path="/decks" render={props => <Pages.AllDecksPage {...props} />}/>
        <Route exact path="/new" render={props => (
          <Pages.NewDeckPage history={this.props.history} userId={this.props.user.id}/>
        )}/>
        <Route exact path="/login" render={props => <Pages.LoginPage {...props} {...this.props}/>}/>
        <Route exact path="/signup" render={props => <Pages.SignupPage {...props} {...this.props}/>}/>
        <Route exact path="/" render={props => <Pages.HomePage {...props} {...this.props}/>}/>
        <Route render={props => <Pages.NoMatchPage/>}/>
      </Switch>
    )
  }
}

export default withAuth(App)

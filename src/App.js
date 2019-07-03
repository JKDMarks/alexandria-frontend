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
        <Route exact path="/decks/all" render={props => <Pages.PageOfDecks page="all" {...props} />}/>
        <Route exact path="/decks/favorites" render={props => <Pages.PageOfDecks page="favorites" {...props} />}/>
        <Route exact path="/decks/my-decks" render={props => <Pages.PageOfDecks page="my-decks" {...props} />}/>
        <Route exact path="/decks/:id" render={props => <Pages.DeckPage {...props} />}/>
        <Route exact path="/decks/:id/edit" render={props => <Pages.EditDeckPage {...props} user={this.props.user} />}/>
        <Route exact path="/new" render={props => (
          <Pages.NewDeckPage history={this.props.history} userId={this.props.user.id}/>
        )}/>
        <Route exact path="/users/:id" render={props => <Pages.UserPage {...props} user={this.props.user}/>}/>
        <Route exact path="/login" render={props => <Pages.LoginPage {...props} {...this.props}/>}/>
        <Route exact path="/signup" render={props => <Pages.SignupPage {...props} {...this.props}/>}/>
        <Route exact path="/" render={props => <Pages.PageOfDecks page="home" {...props} {...this.props}/>}/>
        <Route render={props => <Pages.NoMatchPage/>}/>
      </Switch>
    )
  }
}

export default withAuth(App)

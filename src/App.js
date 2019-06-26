import React, { Component } from 'react';
// import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Pages from './pages'
// import { fetchUser } from './actions/userActions'
import withAuth from './hocs/withAuth'

class App extends Component {
  render() {
    // console.log("App props", this.props)
    return (
      <Switch>
        <Route exact path="/new" render={props => <Pages.NewDeckPage {...props} {...this.props}/>}/>
        <Route exact path="/login" render={props => <Pages.LoginPage {...props} {...this.props}/>}/>
        <Route exact path="/signup" render={props => <Pages.SignupPage {...props} {...this.props}/>}/>
        <Route exact path="/" render={props => <Pages.HomePage {...props} {...this.props}/>}/>
      </Switch>
    )
  }
}

export default withAuth(App)

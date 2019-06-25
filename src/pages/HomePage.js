import React, { Component, Fragment } from 'react';
import Header from '../components/Header'
import { Redirect } from 'react-router'

export default class HomePage extends Component {
  render() {
    console.log("HomePage props", this.props);
    return (
      <Fragment>
        <Header/>
      </Fragment>
    )
  }
}

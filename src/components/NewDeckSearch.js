import React, { Component } from 'react'
import _ from 'lodash'
import { Search } from 'semantic-ui-react'

class NewDeckSearch extends Component {

  state = {
    isLoading: false,
    results: [],
    source: [],
    value: ""
  }

  handleResultSelect = (e, { result }) => {
    this.props.addCardToDeck(result)
    this.setState({ value: "" })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({ isLoading: false, results: [], value: '' })

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.cards, isMatch),
      })
    }, 300)
  }

  render() {
    return (
      <Search
        input={{fluid: true}}
        icon="plus"
        placeholder="Add a Card"
        loading={this.state.isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={this.state.results}
        value={this.state.value}
      />
    );
  }

}

export default NewDeckSearch;

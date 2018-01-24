import React from 'react'
import Router from 'next/router'
import Meta from './Meta'
import Header from './Header'
import SearchList from './SearchList'

export default class extends React.Component {
  constructor() {
    super()

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.setState({
      originalURL: Router.asPath
    })
  }

  handleSearch(query) {
    if (query) {
      const url = `/search?q=${query}`
      window.history.pushState(
        query,
        `Hyper Store - Searching for ${query}`,
        url
      )
    } else {
      window.history.pushState({}, 'Hyper Store', this.state.originalURL)
    }

    this.setState({
      searchQuery: query
    })
  }

  render() {
    return (
      <div className="main">
        <Meta />
        <Header handleSearch={this.handleSearch} />

        {(this.state && this.state.searchQuery) || this.props.query ? (
          <SearchList
            query={
              this.state && this.state.searchQuery
                ? this.state.searchQuery
                : this.props.query
            }
          />
        ) : (
          <div className="page">{this.props.children}</div>
        )}

        <style jsx>{`
          .main {
            padding-left: 40px;
            padding-right: 40px;
          }
        `}</style>
      </div>
    )
  }
}

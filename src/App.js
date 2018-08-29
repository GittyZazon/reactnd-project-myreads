import React from 'react'
import { Route } from 'react-router-dom'
//import sortBy from 'sort-by'
//import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf.js'
import SearchPage from './SearchPage.js'


class BooksApp extends React.Component {
  state = {
    allBooks: []
  }

  toShelf = (value, bookID) => {
    let movedBook = this.state.allBooks.filter((book) => book.id === bookID)
    movedBook[0].shelf = value
    this.setState(state => ({
      allBooks: state.allBooks.filter((book) => book.id !== bookID).concat(movedBook)
    }))
    BooksAPI.update(movedBook, value)
  }

  

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({
        allBooks: allBooks,
        futureRead: allBooks.filter((book) => book.shelf === 'wantToRead'),
        doneRead: allBooks.filter((book) => book.shelf === 'read'),
        reading: allBooks.filter((book) => book.shelf === 'currentlyReading')
      })
    })
  }

  render() {

    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <Bookshelf 
              allBooks={this.state.allBooks}
              onAddToShelf={this.toShelf}
            />
          )}/>

          <Route path='/search' render={() => (
            <SearchPage 
              onSearch={this.search}
              showingBooks={this.state.showingBooks}
            />
          )}/>
      </div>    
    )
  }
}

export default BooksApp

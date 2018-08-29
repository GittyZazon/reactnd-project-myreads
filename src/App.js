import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf.js'
import SearchPage from './SearchPage.js'


class BooksApp extends React.Component {
  state = {
    allBooks: []
  }

  toShelf = (value, bookID) => {
    BooksAPI.get(bookID).then(book => {
    this.setState(state => ({
      allBooks: state.allBooks.filter((book) => book.id !== bookID).concat(book)
    }))
    BooksAPI.update(book, value)
    })
  }

  

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ allBooks })
    })
  }

  render() {

    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <Bookshelf 
              allBooks={this.state.allBooks}
              addToShelf={this.toShelf}
            />
          )}/>

          <Route path='/search' render={() => (
            <SearchPage 
              onSearch={this.search}
              allBooks={this.state.allBooks}
              showingBooks={this.state.showingBooks}
              addToShelf={this.toShelf}
            />
          )}/>
      </div>    
    )
  }
}

export default BooksApp

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
      BooksAPI.update(book, value)
      }).then((book) => {
        BooksAPI.getAll().then((books) => {
        this.setState({allBooks: books})
      })
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
              allBooks={this.state.allBooks}
              addToShelf={this.toShelf}
            />
          )}/>
      </div>    
    )
  }
}

export default BooksApp

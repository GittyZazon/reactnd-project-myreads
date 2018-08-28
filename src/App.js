import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf.js'
import SearchPage from './SearchPage.js'


class BooksApp extends React.Component {
  state = {
    allBooks: [],
    reading: [],
    futureRead: [],
    doneRead: []
  }

  toShelf = (value, bookID) => {
    let movedBook = this.state.allBooks.filter((book) => book.id === bookID)
    console.log(movedBook, value)

    if(value === 'currentlyReading'){
      this.setState(state => ({
        reading: state.reading.push(movedBook)
      }))
      BooksAPI.update(movedBook, 'currentlyReading') 
    } else if(value === 'wantToRead'){
      this.setState(state => ({
        futureRead: state.futureRead.push(movedBook)
      }))
      BooksAPI.update(movedBook, 'wantToRead') 
    } else if(value === 'read'){
      this.setState(state => ({
        doneRead: state.doneRead.push(movedBook)
      }))
      BooksAPI.update(movedBook, 'read') 
    } else if(value === 'none') {
      this.setState(state => ({
        allBooks: state.allBooks.filter((book) => book.id !== bookID)
      }))
      BooksAPI.update(movedBook, 'none')
    }
    console.log(this.state.futureRead)
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
              reading={this.state.reading}
              futureRead={this.state.futureRead}
              doneRead={this.state.doneRead}
              onAddToShelf={this.toShelf}
            />
          )}/>

          <Route path='/search' render={() => (
            <SearchPage />
          )}/>
      </div>    
    )
  }
}

export default BooksApp

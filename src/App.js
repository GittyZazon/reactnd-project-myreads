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

  toShelf = (book) => {
    if(book.shelf === 'currentlyReading'){
      this.setState(state => ({
        reading: state.reading.concat([ book ])
      })) 
    } else if(book.shelf === 'wantToRead'){
      this.setState(state => ({
        futureRead: state.futureRead.concat([ book ])
      }))
    } else if(book.shelf === 'read'){
      this.setState(state => ({
        doneRead: state.doneRead.concat([ book ])
      }))
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ allBooks })
      this.setState({
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

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class Bookshelf extends Component {

	handleChange = (e) => {
		let book = e.target.parent().find('.')
		book.shelf = (e.target.value)
	}

	render() {
		return(
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					  {this.props.reading.map((book) => ( 
					    <li key = {book.id}>
					      <div className="book">
					        <div className="book-top">
					          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
					          <div className="book-shelf-changer">
					            <select onChange={this.handleChange}>
					              <option value="move" disabled>Move to...</option>
					              <option value="currentlyReading">Currently Reading</option>
					              <option value="wantToRead">Want to Read</option>
					              <option value="read">Read</option>
					              <option value="none">None</option>
					            </select>
					          </div>
					        </div>
					        <div className="book-title">{book.title}</div>
					        <div className="book-authors">{book.authors}</div>
					      </div>
					    </li>
					  ))}
					</ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					  {this.props.futureRead.map((book) => ( 
					    <li key = {book.id}>
					      <div className="book">
					        <div className="book-top">
					          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
					          <div className="book-shelf-changer">
					            <select onChange={this.handleChange}>
					              <option value="move" disabled>Move to...</option>
					              <option value="currentlyReading">Currently Reading</option>
					              <option value="wantToRead">Want to Read</option>
					              <option value="read">Read</option>
					              <option value="none">None</option>
					            </select>
					          </div>
					        </div>
					        <div className="book-title">{book.title}</div>
					        <div className="book-authors">{book.authors}</div>
					      </div>
					    </li>
					  ))}
					</ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					  {this.props.doneRead.map((book) => ( 
					    <li key = {book.id}>
					      <div className="book">
					        <div className="book-top">
					          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
					          <div className="book-shelf-changer">
					            <select onChange={this.handleChange}>
					              <option value="move" disabled>Move to...</option>
					              <option value="currentlyReading">Currently Reading</option>
					              <option value="wantToRead">Want to Read</option>
					              <option value="read">Read</option>
					              <option value="none">None</option>
					            </select>
					          </div>
					        </div>
					        <div className="book-title">{book.title}</div>
					        <div className="book-authors">{book.authors}</div>
					      </div>
					    </li>
					  ))}
					</ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}
}

export default Bookshelf
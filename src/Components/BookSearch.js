//enable to search books and display found books correctly and add to the shelf in the main page

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class BookSearch extends Component {
	state = {
		query: '',
		foundBooks: [] //empty in the page as default
	}
	
	updateQuery = (query) => {
		this.setState({
			query: query
		})
		this.updatefoundBooks(query); 
	}
	
	updatefoundBooks = (query) => {
		if (query) {
		BooksAPI.search(query).then((foundBooks) => {
			if(foundBooks.error) { //if the typing words are not matched any books
					this.setState({ foundBooks: [] }); 
			} else {
				this.setState({ foundBooks: foundBooks })
			}			
			}) 
		} 
	}
	
	render() {	
		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link> 
              <div className="search-books-input-wrapper">
                <input
				  type="text" placeholder="Search by title or author"
				  value={this.state.query}
				  onChange={(event) => this.updateQuery(event.target.value)} //reflect any characters input
				/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
			  {
				  this.state.foundBooks.map(foundBook => {
					let shelf = "none"
					this.props.books.map(book => (
						book.id === foundBook.id ? 
						shelf = book.shelf : //if found book id is not matched book, shel is none
						''
					));
					
					return (
						<li key={foundBook.id}>
							<Book
								book={foundBook}
								changeShelf={this.props.changeShelf}
								currentShelf={shelf}
							/>
						</li>
					);					
				  })
			  }
			  </ol>
            </div>
          </div>
		);
	}
	
}

export default BookSearch;
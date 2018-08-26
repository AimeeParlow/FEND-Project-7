//enable to search books and display found books correctly and add to the shelf in the main page

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class BookSearch extends Component {
	state = {
		query: '',
		foundBooks: [] //no books appears as default
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
				foundBooks.error ? this.setState({ foundBooks: [] }) : this.setState({ foundBooks: foundBooks })			
				}) 
		} else {
			this.setState({ foundBooks: [] })
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
						shelf = book.shelf : //if found book's id is matched-book's id in the main page, shelf is as it to be 
						'' // otherwise keep "none"
					));
					
					return (
						<li key={foundBook.id}>
							<Book
								book={foundBook}
								changeShelf={this.props.changeShelf}
								currentShelf={shelf} 
							/> //display found books in the search page
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
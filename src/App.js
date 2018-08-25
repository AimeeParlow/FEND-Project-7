import React from 'react';
import { Route } from 'react-router-dom';
import MainBookList from './Components/MainBookList';
import BookSearch from './Components/BookSearch';
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {	//fetch current books 
			this.setState({books: books})
		})
	}
	// books move to another shelf due to changed state and update
	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);
		
		BooksAPI.getAll().then((books) => { //fetch updated books
			this.setState({ books: books })
		})
	}
			
	render() {
		return ( //to Show updated books in the main book list
			<div className="app">
				<Route exact path="/" render={() => ( //set the location of the app
					<MainBookList 
						books={this.state.books}
						changeShelf={this.changeShelf}
					/>
				)} />
				
				<Route exact path="/search" render={() => ( //set the location of the app
					<BookSearch
						changeShelf={this.changeShelf}
						books={this.state.books}
					/>
				)} />
				{/**/}
			 </div>
			)
		  }
}

export default BooksApp

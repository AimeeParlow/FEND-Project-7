import React from 'react';
import { Route } from 'react-router-dom';
import MainBookList from './Components/MainBookList';
import BookSearch from './Components/BookSearch';
import * as BooksAPI from './BooksAPI';
import './App.css'

class App extends React.Component {
	state = {
		books: []
	}
	
	componentDidMount() {
		BooksAPI.getAll().then((books) => {	//fetch books into [] 
			this.setState({books: books})
		})
	}

	changeShelf = (book, shelf) => { 	// update new shelf
		BooksAPI.update(book, shelf);
		
		this.componentDidMount(); 	// fetch updated books into []
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

export default App

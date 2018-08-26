import React, { Component } from 'react';

//Book's appearance
class Book extends Component {
	render() {
		let bookThumbnail = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail :
		''; //if thumbnail url is not found, do nothing (display blank)
		
		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ 
						width: 128, 
						height: 193, 
						backgroundImage: `url("${bookThumbnail}")`}}></div>
						<div className="book-shelf-changer">
							<select onChange={(event) => this.props.changeShelf(this.props.book, event.target.value)}
								value={
									this.props.currentShelf //change the state of the book
								}
							>
									<option value="move" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
							</select>
						</div>
					</div>
				<div className="book-title">{this.props.book.title}</div>
				<div className="book-authors">{this.props.book.authors}</div>
			</div>
);
}
}

export default Book;
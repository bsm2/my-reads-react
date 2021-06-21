import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
export default class Shelf extends Component {
    // state={
    //     books:[],
    //     currentlyReading:[],
    //     wantToRead:[],
    //     read:[],

    // }
    // componentDidMount() {

    //     BooksAPI.getAll().then((books) => {
    //         // currentlyReading=books.filter(book=>book.shelf =="currentlyReading" )
    //         this.setState(() => ({
    //         books,
    //         currentlyReading:books.filter(book=>book.shelf =="currentlyReading" ),
    //         wantToRead:books.filter(book=>book.shelf =="wantRead" ),
    //         read:books.filter(book=>book.shelf =="read" )
           

    //         }))
    //         console.log(this.state.read)
    //     })
    // }
    render() {
        return (
            <div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {/* {console.log(this.props.read)} */}
                            {this.props.books && this.props.books.map(book=><Book key={book.id} title={book.title} authors={book.authors} image={book.imageLinks.thumbnail} book={book} changeShelf={this.props.changeShelf} shelf={book.shelf} />)}
                            
                        </ol>
                    </div>
                    </div>
            </div>
        )
    }
}
